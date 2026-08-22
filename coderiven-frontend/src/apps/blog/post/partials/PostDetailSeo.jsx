import React from "react";

export default function PostDetailSeo({ post, slug }) {
  const APP_BASE_URL = import.meta.env.VITE_APP_BASE_URL;

  // Safely extract post data
  const title = post?.title
  const description = post?.description
  const tags = post?.tags?.map((item) => item.name).join(", ")
  const author = post?.author?.full_name
  const url = `${APP_BASE_URL}/blog/post/detail/${slug}`;
  const createdAt = post?.created_at 
  const updatedAt = post?.updated_at

  return (
    <>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={tags} />
      <meta name="author" content={author} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="UTF-8" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Your Blog Name" />
      <meta property="article:published_time" content={createdAt} />
      <meta property="article:modified_time" content={updatedAt} />
      <meta property="article:author" content={author} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:site" content="@YourTwitterHandle" />
      <meta name="twitter:creator" content={`@${author.replace(" ", "")}`} />

      {/* Robots */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />
    </>
  );
}
