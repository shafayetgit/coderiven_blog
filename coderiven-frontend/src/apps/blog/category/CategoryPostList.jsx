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

import { usePostListQuery } from "./categorySlice";

export default function CategoryPostList() {
  const { id } = useParams();
  const { data: { category, posts } = {} } = usePostListQuery(id);

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
          aria-label="category title"
        >
          {category || "Category"}
        </Typography>

        <Divider aria-label="divider" />

        {posts && posts?.length > 0 ? (
          <nav aria-label="posts list">
            <List aria-label="posts list">
              {posts.map((item, index) => (
                <React.Fragment key={index}>
                  <ListItem disablePadding aria-label={`post item ${index}`}>
                    <ListItemButton component={Link} to={`/blog/post/detail/${item.slug}`} aria-label={`post ${item.title}`}>
                      <ListItemText primary={item.title} aria-label={`post title ${item.title}`} />
                    </ListItemButton>
                  </ListItem>
                  {index < posts.length - 1 && <Divider aria-label={`divider after post ${index}`} />}
                </React.Fragment>
              ))}
            </List>
          </nav>
        ) : (
          <Box textAlign="center" py={5} aria-label="no posts message">
            <Typography variant="h6" color="textSecondary">
              No posts available for this category.
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
