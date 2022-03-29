import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material'
import AppTheme from '../components/AppTheme'
import Layout from '../components/Layout'
import '../lib/string.extensions'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={AppTheme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}

export default MyApp
