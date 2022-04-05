import { createTheme } from "@mui/material"
import { CSSInterpolation } from "@mui/system"

const customScrollbar: CSSInterpolation = {
  '&::-webkit-scrollbar': {
    width: '0.8em'
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'lightgray',
    borderRadius: '0.3em',
  }
}

const AppTheme = createTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      'Roboto',
      '"Segoe UI"',
      'Helvetica',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          height: '100%'
        },
        body: {
          height: '100%'
        },
        '#__next': {
          height: '100%'
        }
      }
    },
    MuiList: {
      styleOverrides: {
        root: customScrollbar
      }
    },
    MuiInputBase: {
      styleOverrides: {
        input: customScrollbar
      }
    },
  }
});

export default AppTheme