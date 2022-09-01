import React, { useState, ReactNode, useEffect } from "react";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
  useQueryErrorResetBoundary,
} from "react-query";
import { ErrorBoundary } from "react-error-boundary";
import type { AppLayoutProps, NextWebVitalsMetric } from "next/app";
import Script from "next/script";
import { useRouter } from "next/router";
import * as gtag from "../lib/gtag";
import GlobalStyles from "../styles/GlobalStyles";

export function reportWebVitals(metric: NextWebVitalsMetric) {
  console.log(metric);
}

function App({ Component, pageProps }: AppLayoutProps) {
  const [queryClient] = useState(() => new QueryClient());
  const router = useRouter();
  const { reset } = useQueryErrorResetBoundary();

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    router.events.on("hashChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      router.events.off("hashChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  const getLayout = Component.getLayout || ((page: ReactNode) => page);

  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <ErrorBoundary
        onReset={reset}
        fallbackRender={({ resetErrorBoundary }) => (
          <div>
            There was an error!
            <button onClick={() => resetErrorBoundary()}>Try again</button>
          </div>
        )}
      >
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <GlobalStyles />
            {getLayout(<Component {...pageProps} />)}
          </Hydrate>
        </QueryClientProvider>
      </ErrorBoundary>
    </>
  );
}

export default App;
