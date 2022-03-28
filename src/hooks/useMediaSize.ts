import { useTheme, useMediaQuery } from "@mui/material"

const useMediaSize = () => {
  const theme = useTheme()
  const isMobileSize = useMediaQuery(theme.breakpoints.down('sm'))

  return { isMobileSize }
}

export default useMediaSize