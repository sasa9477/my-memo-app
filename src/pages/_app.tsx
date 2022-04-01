import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material'
import AppTheme from '../components/AppTheme'
import Layout from '../components/Layout'
import '../lib/string.extensions'
import { SessionProvider } from 'next-auth/react'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session} refetchInterval={0}>
      <ThemeProvider theme={AppTheme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </SessionProvider>
  )
}

export default MyApp
