import React, { useState } from "react";
import styled from "styled-components";

import { getPosts } from "../../utils/mdx-utils";
import { toBase64, shimmer } from "../../helpers/index";
import Layout from "../../components/layout";
import Image from "next/image";

const BlogPost = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
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
  gap: 20px;
  align-items: center;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }

  > div > p:first-of-type {
    margin-bottom: 0;
  }
   > div > p {
    margin: 0;
  }

  &:hover {
    cursor: pointer;
    transition: 0.5s;
    transform: scale(1.01);
  }
`;

const BlogMargin = styled.p`
  margin-top: 16px !important;
`;

const StyledAnchor = styled.a`
  text-decoration: none;
`;

type Post = {
  filePath: any;
  data: {
    author: string;
    id: number;
    imageSlug: string;
    title: string;
    publishedOn: string;
    summary: string;
  };
};
export default function Blog({ posts }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div>
      {posts.map((post: Post) => {
        const { author, id, imageSlug, title, publishedOn, summary } =
          post?.data;

        const href = `/blog/${post.filePath.replace(/\.mdx?$/, "")}`;

        return (
          <div key={id}>
            <StyledAnchor href={href} key={title}>
              <>
                <BlogPost key={title}>
                  <div>
                    <Image
                      objectFit="contain"
                      alt={title}
                      onError={() => setImageError(true)}
                      src={imageError ? "/logo.svg" : imageSlug}
                      placeholder="blur"
                      blurDataURL={`${imageSlug},${toBase64(
                        shimmer(700, 475)
                      )}`}
                      height={300}
                      width={300}
                    />
                    <p>{publishedOn}</p>
                    <p>{author}</p>
                  </div>
                  <div>
                    <h2 style={{ textDecoration: "underline" }}>{title}</h2>
                    <BlogMargin>{summary}</BlogMargin>
                  </div>
                </BlogPost>
              </>
            </StyledAnchor>
          </div>
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
