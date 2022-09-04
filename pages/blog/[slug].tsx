import React, { FC } from "react";
import { MDXRemote } from "next-mdx-remote";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";
import fs from "fs";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";

import { formatSEOTitle } from "../../helpers/index";
import Layout from "../../components/layout";
import Loader from "../../components/loader";

const BlogTitle = styled.h3`
  margin: 8px 0;
`;

const BlogCard = styled.div`
  border: 4px solid var(--green);
  margin-bottom: 20px;
  background-color: var(--grey);
  border-radius: 4px;
  max-width: 200px;
  text-align: left;
  padding: 12px 4px 12px 32px;
`;

export default function BlogPost({ source, frontMatter }) {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }
  return (
    <div>
      <Head>
        <title>{`AllSpreads Blog | ${frontMatter.title}`}</title>
        <meta
          name="description"
          content={`AllSpreads | ${frontMatter.summary}`}
        />
      </Head>
      <main>
        <h1
          style={{
            textAlign: "center",
            maxWidth: "700px",
            margin: "40px auto",
          }}
        >
          {frontMatter.title}
        </h1>
        <div>
          <BlogCard>
            <Link href="/blog">Back</Link>
            <BlogTitle>{frontMatter.author}</BlogTitle>
            <BlogTitle>{frontMatter.publishedOn}</BlogTitle>
          </BlogCard>
          <MDXRemote {...source} />
        </div>
      </main>
    </div>
  );
}

export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), "posts");
  const filenames = fs.readdirSync(postsDirectory);
  console.log("filenames", filenames);
  const paths = filenames.map((name) => ({
    params: { slug: name.replace(".mdx", "") },
  }));
  console.log("paths", paths);
  // dont get paths for cms posts, instead, let fallback handle it
  return { paths, fallback: true };
}

export async function getStaticProps({ params, preview }) {
  let postFile;
  try {
    const postPath = path.join(process.cwd(), "posts", `${params.slug}.mdx`);
    postFile = fs.readFileSync(postPath, "utf-8");
  } catch (error) {
    // must be from cms or its a 404
    console.error(error);
  }

  if (!postFile) {
    throw new Error("no post");
  }

  const { content, data } = matter(postFile);
  const mdxSource = await serialize(content, { scope: data });

  return { props: { source: mdxSource, frontMatter: data }, revalidate: 30 };
}

BlogPost.getLayout = function getLayout(page: any) {
  const title = formatSEOTitle("post");
  const formatString = title ? `${title}` : "Blog";

  return (
    <>
      <Layout title={formatString}>{page}</Layout>
    </>
  );
};
