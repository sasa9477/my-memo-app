import { Fab, styled } from "@mui/material"
import { AddIcon } from "./icons/AddIcon"

type AppFabProps = {
}

const AppFab: React.FC<AppFabProps> = (): JSX.Element => {
  const StyledFab = styled(Fab)(({ theme }) => ({
    position: 'absolute',
    right: theme.spacing(2),
    bottom: `calc(${theme.mixins.toolbar.minHeight}px + ${theme.spacing(2)})`,
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  }))

 return (
   <StyledFab color="primary">
     <AddIcon/>
   </StyledFab>
 )
}

export default AppFab