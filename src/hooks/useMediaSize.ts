import { useTheme, useMediaQuery, Theme } from "@mui/material"

const useMediaSize = () => {
  const isMobileSize = useMediaQuery((theme:Theme) => theme.breakpoints.down('sm'),{ noSsr: true })

  return { isMobileSize }
}

export default useMediaSize