import { Fab, styled } from "@mui/material"
import { AddIcon } from "./icons/AddIcon"

type AppFabProps = {
}

const AppFab: React.FC<AppFabProps> = (): JSX.Element => {
  const StyledFab = styled(Fab)(({ theme }) => ({
    position: 'absolute',
    right: theme.spacing(2),
    bottom: theme.spacing(2)
  }))

 return (
   <StyledFab>
     <AddIcon/>
   </StyledFab>
 )
}

export default AppFab