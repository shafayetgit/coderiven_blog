import { useState } from "react";
import { Box, TextField, Typography, Button, Tooltip } from "@mui/material";
import {
  usePostCommentCreateMutation,
} from "../postApiSlice";
import { useSelector } from "react-redux";

export default function PostCommentReplyCreate({ slug, callback, parent = 0 }) {
  const { isAuth } = useSelector((state) => state.userAuth);

  const [postCommentCreate, { isLoading, isError, isSuccess }] =
    usePostCommentCreateMutation();


  const [comment, setComment] = useState({ content: "", parent: parent });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!comment.content.trim()) return; // Prevent empty submissions

    try {
      // Create a new comment
      await postCommentCreate({
        data: comment,
        slug,
      }).unwrap();

      // Close the reply form
      callback();
      // Clear input and refetch comments
      setComment({ content: "", parent: parent });
    } catch (err) {
      console.error("Post Comment Error:", err);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Tooltip title={!isAuth && "Please sign in first"}>
        <TextField
          name="content"
          value={comment.content}
          onChange={(e) => setComment({ ...comment, content: e.target.value })}
          fullWidth
          placeholder="Write a reply..."
          multiline
          minRows={2} // Minimum rows
          maxRows={10}
          disabled={!isAuth}
          aria-label="Reply content"
          sx={{
            borderRadius: 1,
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "primary.main",
              },
              "&.Mui-focused fieldset": {
                borderColor: "primary.main",
                borderWidth: "2px",
              },
            },
            textarea: {
              resize: "both",
              overflow: "auto",
            },
          }}
        />
      </Tooltip>

      <Button
        variant="contained"
        color="primary"
        type="submit"
        sx={{ marginTop: 2 }}
        disabled={isLoading || !isAuth}
        aria-label="Submit reply"
      >
        {isLoading ? "Submitting..." : "Submit"}
      </Button>
      {isError && (
        <Typography color="error" variant="body2" sx={{ marginTop: 2 }}>
          Failed to submit the reply. Please try again.
        </Typography>
      )}
    </Box>
  );
}
