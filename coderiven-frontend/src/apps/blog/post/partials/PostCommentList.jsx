import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Stack,
  Button,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import { usePostCommentListQuery } from "../postApiSlice";
import PostCommentReplyCreate from "./PostCommentReplyCreate";
import { useSelector } from "react-redux";

export default function PostCommentList({ slug }) {
  const { isAuth } = useSelector((state) => state.userAuth);
  const { data, isLoading, isError } = usePostCommentListQuery(slug);
  const [replyingTo, setReplyingTo] = useState(null);

  const comments = data?.data || [];

  const renderComment = (comment, isReply = false) => (
    <Box key={comment.id} sx={{ marginLeft: isReply ? 4 : 0 }}>
      {/* Single Comment */}
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          padding: 2,
          borderRadius: 2,
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          marginBottom: 2,
        }}
      >
        <Avatar
          sx={{ marginRight: 2, width: 40, height: 40 }}
          src={comment.user.avatar || "/path/to/default-avatar.jpg"}
          alt={`${comment.user.first_name || "Anonymous"} ${
            comment.user.last_name || ""
          }`}
        />
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            {`${comment.user.first_name || "Anonymous"} ${
              comment.user.last_name || ""
            }`}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ marginBottom: 1 }}
          >
            {new Date(comment.created_at).toLocaleString()}
          </Typography>
          <Typography variant="body1">{comment.content}</Typography>
          {!isReply && (
            <Tooltip
              title={!isAuth ? "Please sign in first" : "Reply"}
              followCursor
            >
              <Box>
                <Button
                  size="small"
                  sx={{ marginTop: 1 }}
                  onClick={() => setReplyingTo(comment.id)}
                  disabled={!isAuth}
                >
                  Reply
                </Button>
              </Box>
            </Tooltip>
          )}
        </Box>
      </Box>

      {/* Reply Input */}
      {replyingTo === comment.id && (
        <Box sx={{ marginLeft: 4, marginTop: 2 }}>
          <PostCommentReplyCreate
            slug={slug}
            parent={comment.id}
            callback={() => setReplyingTo(null)}
          />
        </Box>
      )}

      {/* Render Replies */}
      {comment.children?.length > 0 && (
        <Box sx={{ marginTop: 2 }}>
          {comment.children.map((child) => renderComment(child, true))}
        </Box>
      )}
    </Box>
  );

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Typography variant="body1" color="error" textAlign="center" aria-label="error-message">
      Failed to load comments.
      </Typography>
    );
  }

  const topLevelComments = comments.filter(
    (comment) => comment.parent === null
  );

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Comments
      </Typography>
      {topLevelComments.length > 0 ? (
        <Stack spacing={2}>
          {topLevelComments.map((comment) => renderComment(comment))}
        </Stack>
      ) : (
        <Typography variant="body2" color="text.secondary">
          No comments yet.
        </Typography>
      )}
    </Box>
  );
}
