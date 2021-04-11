import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Admin</title>
      </Head>
      <div className="app">
        <main>
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
          </QueryClientProvider>
        </main>
      </div>
    </>
  );
}
