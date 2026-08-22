import React from "react";

export default function HomePage() {
  const APP_BASE_URL = import.meta.env.VITE_APP_BASE_URL;

  // Meta data specific to the app's niche
  const title = "Coderiven | Explore Programming Languages, Frameworks, and Web Servers";
  const description =
    "Dive into the world of programming with detailed guides, tutorials, and insights on programming languages, frameworks, web servers, and more. Stay ahead in technology with our curated content.";
  const keywords =
    "programming languages, frameworks, web servers, tutorials, coding, JavaScript, Python, Django, React, web development, back-end, front-end";
  const author = "Shafayet Haydar";
  const url = `${APP_BASE_URL}/`;
  const image = `${APP_BASE_URL}/default-homepage-image.jpg`; // Replace with a niche-relevant image

  return (
    <>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="UTF-8" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Coderiven" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@YourTwitterHandle" />
      <meta name="twitter:creator" content="@YourTwitterHandle" />

      {/* Robots */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
    </>
  );
}
