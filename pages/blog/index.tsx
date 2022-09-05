import React from "react";
import Link from "next/link";
import styled from "styled-components";

import { getPosts } from "../../utils/mdx-utils";
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
      {posts.map((post) => {
        const { title, publishedOn, summary } = post?.data;
        return (
          <React.Fragment key={post.title}>
            <Link
              as={`/blog/${post.filePath.replace(/\.mdx?$/, "")}`}
              href={`/blog/[slug]`}
              key={post.title}
            >
              <BlogPost key={post.title}>
                <h2 style={{ textDecoration: "underline" }}>{title}</h2>
                <p>{publishedOn}</p>
                <p>{summary}</p>
              </BlogPost>
            </Link>
          </React.Fragment>
        );
      })}
    </div>
  );
}

export function getStaticProps() {
  const posts = getPosts();

  return { props: { posts } };
}
Blog.getLayout = function getLayout(page: any) {
  return (
    <>
      <Layout title="Blog on Spreads, Betting and Sports">{page}</Layout>
    </>
  );
};
