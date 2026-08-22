import { useParams } from "react-router";
import React from "react";

import { Box, Card, CardContent, Typography } from "@mui/material";

import { useDetailQuery } from "./postApiSlice";
import PostCard from "./partials/PostCard";

import PostDetailFallback from "./fallback/PostDetailFallback";
import PostCommentList from "./partials/PostCommentList";
import PostCardSlider from "@/components/PostCardSlider";
import PostDetailSeo from "./partials/PostDetailSeo";

export default function PostDetail() {
  const { slug } = useParams();
  const { data: post } = useDetailQuery(slug);

  return (
    <>
      {post && <PostDetailSeo post={post} slug={slug} />}
      <React.Suspense fallback={<PostDetailFallback />}>
        {post && (
          <>
            <PostCard post={post} isDetailPage />
            <Box my={4}>
              {post?.related_posts.length > 0 && (
                <>
                  <Typography variant="h4" textAlign="center" fontWeight="bold">
                    Related Posts
                  </Typography>
                  <PostCardSlider items={post?.related_posts} />
                </>
              )}
            </Box>
            <Card sx={{ backgroundColor: "transparent" }}>
              <CardContent>
                <PostCommentList slug={post?.slug} />
              </CardContent>
            </Card>
          </>
        )}
      </React.Suspense>
    </>
  );
}
