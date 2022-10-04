import React from "react";
import Head from "next/head";
import { SEOData } from "../config";

export default function SEO({ description, title }) {
  const siteTitle = SEOData.title;

  return (
    <Head>
      <title>{`${description} | ${siteTitle}`}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta
        key="og"
        property="og:image"
        content="https://allspreads.com/logo.png"
      />
      <meta property="og:url" content="https://allspreads.com/" />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="twitter:card" content="summary" />
      <meta property="twitter:creator" content={SEOData.social.twitter} />
      <meta property="twitter:title" content={title || siteTitle} />
      <meta property="twitter:description" content={description} />
      <meta
        key="twitter"
        property="twitter:image:src"
        content="https://allspreads.com/logo.png"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link
        rel="preload"
        href="/Empirez.woff"
        as="font"
        type="font/woff"
        crossOrigin="true"
      />
    </Head>
  );
}
