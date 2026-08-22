import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";


import { Box, Chip, Stack } from "@mui/material";
import { formatDate } from "@/utils/cdayjs";
import { Link } from "react-router";

import CMarkdown from "@/components/CMarkdown";
import PostCommentCreate from "./PostCommentCreate";
import Like from "./Like";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import CButton from "@/components/CButton";
import { Comment } from "@mui/icons-material";

export default function PostCard({ post, isDetailPage = false }) {
  const { isAuth } = useSelector((state) => state.userAuth);

  return (
    <Card sx={{ backgroundColor: "transparent" }}>
      <CardHeader
        avatar={<Avatar sx={{ backgroundColor: "primary.main" }}>S</Avatar>}
        title={post?.created_by || "Author Name"}
        subheader={`${formatDate(post?.created_at)} | ${post?.reading_time}`}
        sx={{
          ".MuiCardHeader-title": { fontWeight: "bold" }, // Change title color
          ".MuiCardHeader-subheader": { color: "text.primary" }, // Change subheader color
        }}
      />
      {/* <Divider sx={{ marginX: 2 }} /> */}
      <Stack direction="row" spacing={1} justifyContent="end" mx={2} my={1}>
        {post?.tags?.map((item, index) => (
          <Chip
            label={item.name}
            key={index}
            component={Link}
            to={`/blog/tag/post-list/${item.slug}`}
            clickable
            aria-label={`Tag: ${item.name}`}
          />
        ))}
      </Stack>

      <CardContent>
        <Typography
          variant="h5"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: "bold",
            textTransform: "capitalize",
          }}
        >
          {post?.title}
        </Typography>
        {!isDetailPage ? (
          <Typography variant="body1">
            {post?.summary}
            <Box component="span" ml={1}>
              <Link
                to={`/blog/post/detail/${post?.slug}`}
                aria-label="Read more about this post"
              >
                Read more
              </Link>
            </Box>
          </Typography>
        ) : (
          <CMarkdown content={post?.content} />
        )}
      </CardContent>

      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-around", // Adjust as needed
          alignItems: "center",
        }}
      >
        <Like post={post} />

        <Stack direction={"row"} alignItems="center">
          <CButton
            tooltip={!isAuth && "Please sign in first"}
            component={Link}
            to={`/blog/post/detail/${post?.slug}#comment-form`}
            iconButton
            icon={<Comment />}
            disabled={!isAuth}
            aria-label="Comment on this post"
          />
          <Typography variant="body2">{post?.total_comments}</Typography>
        </Stack>
      </CardActions>

      {isDetailPage && (
        <CardContent id="comment-form">
          <PostCommentCreate slug={post?.slug} />
        </CardContent>
      )}
    </Card>
  );
}

PostCard.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    created_by: PropTypes.string,
    created_at: PropTypes.string,
    reading_time: PropTypes.string,
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        slug: PropTypes.string,
      })
    ),
    summary: PropTypes.string,
    content: PropTypes.string,
    slug: PropTypes.string,
    total_comments: PropTypes.number,
  }).isRequired,
  isDetailPage: PropTypes.bool,
};
