import { ThemeProvider } from '@mui/material';
import { SessionProvider } from "next-auth/react";
import type { AppProps } from 'next/app';
import CommonMeta from '../components/CommonMeta';
import '../styles/globals.css';
import theme from '../themes/theme';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <SessionProvider session={session}>
        <CommonMeta/>
        <Component {...pageProps} />
      </SessionProvider>
    </ThemeProvider>
  )
}

export default MyApp
