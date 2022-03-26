import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material'
import AppTheme from '../components/AppTheme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={AppTheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
