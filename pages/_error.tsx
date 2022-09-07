/**
 * This page is loaded by Nextjs:
 *  - on the server, when data-fetching methods throw or reject
 *  - on the client, when `getInitialProps` throws or rejects
 *  - on the client, when a React lifecycle method throws or rejects, and it's
 *    caught by the built-in Nextjs error boundary
 *
 * See:
 *  - https://nextjs.org/docs/basic-features/data-fetching/overview
 *  - https://nextjs.org/docs/api-reference/data-fetching/get-initial-props
 *  - https://reactjs.org/docs/error-boundaries.html
 */

import * as Sentry from "@sentry/nextjs";
import NextErrorComponent from "next/error";
import Link from "next/link";
import Layout from "../components/layout";

export default function CustomErrorComponent(props) {
  return (
    <>
      <div className="center">
        <h2>404 - Page Not Found</h2>
        <Link href="/">Home</Link>
      </div>
    </>
  );
}

CustomErrorComponent.getInitialProps = async (contextData) => {
  // In case this is running in a serverless function, await this in order to give Sentry
  // time to send the error before the lambda exits
  await Sentry.captureUnderscoreErrorException(contextData);

  // This will contain the status code of the response
  return NextErrorComponent.getInitialProps(contextData);
};

CustomErrorComponent.getLayout = function getLayout(page) {
  return (
    <>
      <Layout title="Error Page">{page}</Layout>
    </>
  );
};
