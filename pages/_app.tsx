import React, { useState, ReactNode, useEffect } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import GlobalStyles from "../styles/GlobalStyles";
import type { AppLayoutProps, NextWebVitalsMetric } from "next/app";
import { useRouter } from "next/router";
import * as gtag from "../lib/gtag";

export function reportWebVitals(metric: NextWebVitalsMetric) {
  console.log(metric);
}

function App({ Component, pageProps }: AppLayoutProps) {
  const [queryClient] = useState(() => new QueryClient());
  const router = useRouter();

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
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <GlobalStyles />
          {getLayout(<Component {...pageProps} />)};
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

export default App;
