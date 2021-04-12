import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const queryClient = new QueryClient();

const theme = extendTheme({});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Admin</title>
      </Head>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </ChakraProvider>
    </>
  );
}
