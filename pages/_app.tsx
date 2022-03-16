import { ThemeProvider } from '@mui/material';
import { SessionProvider } from "next-auth/react";
import type { AppProps } from 'next/app';
import CommonMeta from '../components/CommonMeta';
import Layout from '../components/Layout';
import '../styles/globals.css';
import theme from '../themes/theme';

function MyApp({ Component, pageProps:{ session, ...pageProps }}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>
        <CommonMeta/>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </SessionProvider>
  )
}

export default MyApp
