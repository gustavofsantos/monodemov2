import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ChakraProvider, Flex } from '@chakra-ui/react';

import './styles.css';

const queryClient = new QueryClient();

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>app</title>
      </Head>
      <ChakraProvider>
        <Flex>
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
          </QueryClientProvider>
        </Flex>
      </ChakraProvider>
    </>
  );
}

export default CustomApp;
