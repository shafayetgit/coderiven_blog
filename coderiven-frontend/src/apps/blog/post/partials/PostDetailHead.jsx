import React from "react";

export default function PostDetailHead({ post }) {
  const APP_BASE_URL = import.meta.env.VITE_APP_BASE_URL;
  const tagNames = post.tags.map((tag) => tag.name).join(", "); // Extract tag names and join as a string

  return (
    <>
      <title>Coderiven | Post - {post.title}</title>
      <meta name="description" content={post.summary} />
      <meta name="keywords" content={tagNames} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={`${APP_BASE_URL}/blog/post/detail/${post.slug}`} />

      {/* Open Graph (Social Sharing) */}
      <meta property="og:title" content={post.title} />
      <meta property="og:description" content={post.summary} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={`${APP_BASE_URL}/${post.slug}`} />
      <meta property="article:published_time" content={post.created_at} />
      <meta property="article:author" content={post.author.full_name} />
      {post.tags.map((tag, index) => (
        <meta property="article:tag" content={tag.name} key={index} />
      ))}

      {/* Twitter Card */}
      <meta name="twitter:card" content={post.summary} />
      <meta name="twitter:title" content={post.title} />
      <meta name="twitter:description" content={post.summary} />
    </>
  );
}
