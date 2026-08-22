import CSkeleton from "@/components/CSkeleton";
import { Stack } from "@mui/material";

const PostListFallback = () => {
  return (
    <Stack spacing={2}>
      {Array.from({ length: 15 }).map((_, index) => (
        <CSkeleton height={250} key={index} />
      ))}
    </Stack>
  );
};

export default PostListFallback;
