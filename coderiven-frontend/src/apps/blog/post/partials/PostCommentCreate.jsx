import { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Card,
  CardContent,
  Tooltip,
} from "@mui/material";
import { usePostCommentCreateMutation } from "../postApiSlice";
import { useSelector } from "react-redux";

export default function PostCommentCreate({
  slug,
  isReply = false,
  parent = 0,
}) {
  const { isAuth } = useSelector((state) => state.userAuth);
  const [postCommentCreate, { isLoading }] = usePostCommentCreateMutation();
  const [comment, setComment] = useState({ content: "", parent });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!comment.content.trim()) return; // Prevent empty submissions

    try {
      // Create a new comment
      const newComment = await postCommentCreate({
        data: comment,
        slug,
      }).unwrap();

      // Clear input
      setComment({ content: "", parent });
    } catch (err) {
      console.error("Post Comment Error:", err);
    }
  };

  return (
    <Card sx={{ backgroundColor: "transparent" }}>
      <CardContent>
        {!isReply && (
          <Typography variant="h6" gutterBottom>
            Leave a Comment
          </Typography>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Tooltip title={!isAuth && "Please sign in first"}>
            <TextField
              name="content"
              value={comment.content}
              onChange={(e) =>
                setComment({ ...comment, content: e.target.value })
              }
              fullWidth
              placeholder={
                !isReply ? "Write your comment here..." : "Write a reply..."
              }
              multiline
              minRows={4} // Minimum rows
              maxRows={10}
              disabled={!isAuth}
              aria-label="Comment content"
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
            aria-label="Submit comment"
          >
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
