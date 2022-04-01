import { Fab, styled } from "@mui/material"
import Link from "next/link"
import { AddIcon } from "./icons/AddIcon"

const StyledFab = styled(Fab)(({ theme }) => ({
  position: 'absolute',
  right: theme.spacing(3),
  bottom: `calc(${theme.mixins.toolbar.minHeight}px + ${theme.spacing(3)})`
}))

type AppFabProps = {
}

const AppFab: React.FC<AppFabProps> = (): JSX.Element => {
 return (
   <>
    <Link href='/create' passHref>
      <StyledFab color="primary">
        <AddIcon/>
      </StyledFab>
    </Link>
   </>
 )
}

export default AppFab