import { lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InView } from "react-intersection-observer";

import { Stack } from "@mui/material";

import { useListQuery } from "./postApiSlice";
import { setPage } from "./postSlice";

import CCircularProgress from "@/components/CCircularProgress";
import PostListFallback from "./fallback/PostListFallback";
const PostCard = lazy(() => import("./partials/PostCard"));

const PostList = () => {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.blogPost.page);
  // Fetch posts using RTK Query
  const { data: { items: posts = [], count = 0 } = {}, isLoading } =
    useListQuery({ page });

  const handleInView = (inView) => {
    if (inView && posts.length > 0 && posts.length < count) {
      dispatch(setPage(page + 1));
    }
  };

  return (
    <Stack spacing={2}>
      {posts.map((post) => (
        <Suspense
          key={post.id || post.slug || post.title}
          fallback={Array.from({ length: 5 }).map((_, index) => (
            <PostListFallback key={index} />
          ))}
        >
          <PostCard post={post} />
        </Suspense>
      ))}

      <InView as="div" onChange={handleInView}>
        {!isLoading && posts.length < count && <CCircularProgress />}
      </InView>
    </Stack>
  );
};

export default PostList;
