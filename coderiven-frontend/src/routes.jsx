import React from "react";
import { createBrowserRouter } from "react-router";

import NotFound from "./components/errorPages/NotFound";
import BaseLayout from "./layouts/BaseLayout";
const Home = React.lazy(() => import("./apps/Home"));
const About = React.lazy(() => import("./apps/About"));

import blogRoutes from "./apps/blog/blogRoutes";
import userRoutes from "./apps/user/userRoutes";

const routes = createBrowserRouter([
  {
    element: <BaseLayout />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <Home /> },
      { path: "about", element: <About /> },

      // Blog Routes
      {
        path: "blog",
        children: blogRoutes,
      },

      // User Routes
      {
        path: "user",
        children: userRoutes,
      },
    ],
  },
]);

export default routes;
