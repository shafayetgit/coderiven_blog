import React, { lazy, Suspense } from "react";

import PostListFallback from "./blog/post/fallback/PostListFallback";
import HomePage from "../seo/HomePage";

const PostList = lazy(() => import("./blog/post/PostList"));

const Home = () => {
  return (
    <>
      <HomePage />
      <React.Suspense fallback={<PostListFallback />}>
        <PostList />
      </React.Suspense>
    </>
  );
};

export default Home;
