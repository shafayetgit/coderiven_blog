import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { CircularProgress, Typography, Stack } from "@mui/material";
import { usePostLikeOrDislikeMutation } from "../postApiSlice";
import { useSelector } from "react-redux";
import CButton from "@/components/CButton";

export default function Like({ post }) {
  const { isAuth } = useSelector((state) => state.userAuth);
  const [postLikeOrDislike, { isLoading }] = usePostLikeOrDislikeMutation();

  const handleLikeToggle = async () => {
    try {
      await postLikeOrDislike(post?.slug).unwrap();
    } catch (error) {
      console.error("Failed to toggle like:", error);
    }
  };

  return (
    <Stack direction="row" alignItems="center" spacing={1} aria-label="like button and total likes">
      <CButton
        tooltip={!isAuth && "Please sign in first"}
        onClick={handleLikeToggle}
        color={post?.has_user_liked ? "error" : "default"}
        sx={{
          color: post?.has_user_liked ? "error.main" : "inherit",
          cursor: !isAuth ? "not-allowed" : "pointer",
        }}
        iconButton
        icon={
          isLoading ? (
            <CircularProgress size={24} />
          ) : post?.has_user_liked ? (
            <Favorite />
          ) : (
            <FavoriteBorder />
          )
        }
        disabled={!isAuth} // Still to limit onClick
        aria-label="like button"
      />

      <Typography variant="body2" aria-label="total likes">{post?.total_likes}</Typography>
    </Stack>
  );
}
