import React, { useState } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import Layout from "../components/layout";
import GlobalStyles from "../styles/GlobalStyles";
// import type { AppProps } from "next/app";

function App({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());
  const getLayout = Component.getLayout || ((page) => page);
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
