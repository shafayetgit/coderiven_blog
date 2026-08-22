import React from "react";

import { Link, useParams } from "react-router";

import {
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";
import { usePostListQuery } from "./tagSlice";

import CLinearProgress from "@/components/CLinearProgress";

export default function TagPostList() {
  const { slug } = useParams();
  const { data: { tag, posts } = {} } = usePostListQuery(slug);

  return (
    <Card sx={{ background: "transparent" }}>
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          fontWeight="bold"
          textTransform="capitalize"
          pl={2}
          mb={2}
        >
          {tag || "Tag"}
        </Typography>

        <Divider />

        {posts && posts.length > 0 ? (
          <nav aria-label="posts list">
            <List>
              {posts.map((item, index) => (
                <React.Fragment key={index}>
                  <ListItem disablePadding>
                    <ListItemButton
                      component={Link}
                      to={`/blog/post/detail/${item.slug}`}
                      aria-label={`Read more about ${item.title}`}
                    >
                      <ListItemText primary={item.title} />
                    </ListItemButton>
                  </ListItem>
                  {index < posts.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </nav>
        ) : (
          <Box textAlign="center" py={5}>
            <Typography variant="h6" color="textSecondary">
              No posts available for this tag.
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
