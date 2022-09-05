import React, { FC } from "react";
import { MDXRemote } from "next-mdx-remote";
import { getPostBySlug, postFilePaths } from "../../utils/mdx-utils";

import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";

import { formatSEOTitle } from "../../helpers/index";
import Layout from "../../components/layout";
import Loader from "../../components/loader";
import CustomLink from "../../components/customlink";

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

const components = {
  a: CustomLink,
  // It also works with dynamically-imported components, which is especially
  // useful for conditionally loading components for certain routes.
  // See the notes in README.md for more details.
};

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
          <MDXRemote {...source} components={components} />
        </div>
      </main>
    </div>
  );
}

export const getStaticProps = async ({ params }) => {
  const { mdxSource, data } = await getPostBySlug(params.slug);

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = postFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ""))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

// export async function getStaticPaths() {
//   const postsDirectory = path.join(process.cwd(), "posts");
//   const filenames = fs.readdirSync(postsDirectory);
//   const paths = filenames.map((name) => ({
//     params: { slug: name.replace(".mdx", "") },
//   }));
//   // dont get paths for cms posts, instead, let fallback handle it
//   return { paths, fallback: true };
// }

// export async function getStaticProps({ params, preview }) {
//   let postFile;
//   try {
//     const postPath = path.join(process.cwd(), "posts", `${params.slug}.mdx`);
//     postFile = fs.readFileSync(postPath, "utf-8");
//   } catch (error) {
//     // must be from cms or its a 404
//     console.error(error);
//   }

//   if (!postFile) {
//     throw new Error("no post");
//   }

//   const { content, data } = matter(postFile);
//   const mdxSource = await serialize(content, { scope: data });

//   return { props: { source: mdxSource, frontMatter: data }, revalidate: 30 };
// }

BlogPost.getLayout = function getLayout(page: any) {
  const title = formatSEOTitle("post");
  const formatString = title ? `${title}` : "Blog";

  return (
    <>
      <Layout title={formatString}>{page}</Layout>
    </>
  );
};
