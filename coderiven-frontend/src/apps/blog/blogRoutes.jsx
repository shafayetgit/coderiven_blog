import { lazy } from "react";

const PostDetail = lazy(() => import("./post/PostDetail"));
const CategoryList = lazy(() => import("./category/CategoryList"));
const TagList = lazy(() => import("./tag/TagList"));
const CategoryPostList = lazy(() => import("./category/CategoryPostList"));
const TagPostList = lazy(() => import("./tag/TagPostList"));

const blogRoutes = [
  // Post
  {
    path: "post",
    children: [
      {
        path: "detail/:slug",
        element: <PostDetail />,
      },
    ],
  },

  // Tag
  {
    path: "tag",
    children: [
      {
        path: "list",
        element: <TagList />,
      },
      {
        path: "post-list/:slug",
        element: <TagPostList />,
      },
    ],
  },

  // Category
  {
    path: "category",
    children: [
      {
        path: "list",
        element: <CategoryList />,
      },
      {
        path: "post-list/:id",
        element: <CategoryPostList />,
      },
    ],
  },
];

export default blogRoutes;
