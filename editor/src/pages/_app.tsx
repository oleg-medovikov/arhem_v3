import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import localFont from 'next/font/local';
import Head from 'next/head';

import './globals.css';

const AppLayout = dynamic(() => import('@/components/AppLayout'), {
  ssr: false,
});

const firaCode = localFont({
  src: '../assets/fonts/FiraCodeVF.woff2',
  variable: '--font-fira-code',
  weight: '100 900',
});

export default function ArhmEditr({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/editor/favicon.svg" />
        <link rel="apple-touch-icon" href="/editor/apple-touch-icon.png" />
      </Head>
      <style jsx global>{`
        html {
          font-family: ${firaCode.style.fontFamily};
        }
      `}</style>
      <AppLayout>
        <Component suppressHydrationWarning {...pageProps} />
      </AppLayout>
    </>
  );
}
