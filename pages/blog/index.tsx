import React from "react";
import matter from "gray-matter";
import path from "path";
import fs from "fs";
import Link from "next/link";
import orderby from "lodash.orderby";
import styled from "styled-components";

import { formatSEOTitle } from "../../helpers/index";
import Layout from "../../components/layout";

const BlogPost = styled.div`
  display: grid;
  list-style-type: none;
  background-color: var(--grey);
  border: 4px solid var(--green);
  border-radius: 8px;
  text-align: left;
  padding: 40px;
  margin: 20px; 0;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  transform: scale(1);
  transition: 0.5s;
`;

export default function Blog({ posts }) {
  return (
    <div>
      {posts.map((post) => (
        <Link key={post.title} href={`blog/${post.slug}`}>
          <BlogPost key={post.title}>
            <h2 style={{ textDecoration: "underline" }}>{post.title}</h2>
            <p>{post.publishedOn}</p>
            <p>{post.summary}</p>
          </BlogPost>
        </Link>
      ))}
    </div>
  );
}

export async function getStaticProps(ctx) {
  const postsDirectory = path.join(process.cwd(), "posts");
  const filenames = fs.readdirSync(postsDirectory);
  const filePosts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    return fs.readFileSync(filePath, "utf8");
  });

  const posts = orderby(
    filePosts.map((content) => {
      const { data } = matter(content);
      return data;
    }),
    ["publishedOn"],
    ["desc"]
  );

  return { props: { posts } };
}

Blog.getLayout = function getLayout(page: any) {
  const title = formatSEOTitle("blog");
  const formatString = title ? `${title}` : "Blog";

  return (
    <>
      <Layout title={formatString}>{page}</Layout>
    </>
  );
};
