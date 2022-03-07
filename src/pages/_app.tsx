import { ThemeProvider } from '@mui/material';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import CommonMeta from './components/CommonMeta';
import theme from './themes/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CommonMeta/>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
