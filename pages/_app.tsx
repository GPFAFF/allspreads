import React, { useState, ReactNode } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import GlobalStyles from "../styles/GlobalStyles";
import type { AppLayoutProps } from "next/app";

function App({ Component, pageProps }: AppLayoutProps) {
  const [queryClient] = useState(() => new QueryClient());

  const getLayout = Component.getLayout || ((page: ReactNode) => page)

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <GlobalStyles />
        {getLayout(<Component {...pageProps} />)};
      </Hydrate>
    </QueryClientProvider>
  );
}

export default App;
