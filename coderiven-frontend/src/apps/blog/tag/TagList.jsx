import React from "react";
import { Box, Typography, Grid2 } from "@mui/material";
import { useListQuery } from "./tagSlice";
import CSkeleton from "@/components/CSkeleton";
const CLinkCard = React.lazy(() => import("@/components/CLinkCard"));

export default function TagList() {
  const { data } = useListQuery();
  const tags = data?.data;
  return (
    <React.Suspense
      fallback={
        <Grid2 container spacing={2} justifyContent="center">
          {Array.from({ length: 15 }).map((_, index) => (
            <Grid2
              item="true"
              size={{ lg: 3, md: 4, sm: 6, xs: 12 }}
              key={index}
            >
              <CSkeleton key={index} variant="rectangular" height={200} />
            </Grid2>
          ))}
        </Grid2>
      }
    >
      <Typography
        variant="h6"
        sx={{ mb: 2, fontWeight: "bold" }}
        aria-label="Tags"
      >
        Tags
      </Typography>

      <Grid2 container spacing={2} justifyContent="center">
        {tags?.map((item, index) => (
          <Grid2 item="true" size={{ lg: 3, md: 4, sm: 6, xs: 12 }} key={index}>
            <CLinkCard
              title={`${item.name} (${item.total_posts})`}
              to={`/blog/tag/post-list/${item.slug}`}
              aria-label={`Tag ${item.name} with ${item.total_posts} posts`}
            />
          </Grid2>
        ))}
      </Grid2>
    </React.Suspense>
  );
}
