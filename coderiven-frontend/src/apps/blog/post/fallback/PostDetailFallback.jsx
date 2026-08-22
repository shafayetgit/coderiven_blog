import React from "react";
import CSkeleton from "@/components/CSkeleton";
import { Stack } from "@mui/material";

const PostDetailFallback = () => {
  return (
    <Stack spacing={2}>
      <CSkeleton height={20} />
      <CSkeleton height={20} />
      <CSkeleton height={200} />
      <CSkeleton height={20} />
      <CSkeleton height={200} />
      <CSkeleton height={20} />
      <CSkeleton height={20} />
      <CSkeleton height={200} />
      <CSkeleton height={20} />
      <CSkeleton height={200} />
    </Stack>
  );
};

export default PostDetailFallback;
