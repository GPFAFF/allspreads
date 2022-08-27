import React from "react";
import Head from "next/head";
import { SEOData } from "../config";

export default function SEO({ description, title }) {
  const siteTitle = SEOData.title;

  return (
    <Head>
      <title>{`${siteTitle}`}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:image" content="https://allspreads.com/logo.svg" />
      <meta property="og:url" content="https://allspreads.com/" />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="twitter:card" content="summary" />
      <meta property="twitter:creator" content={SEOData.social.twitter} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <link
        rel="preload"
        href="/Empirez.woff"
        as="font"
        type="font/woff"
        crossOrigin
      />
    </Head>
  );
}
