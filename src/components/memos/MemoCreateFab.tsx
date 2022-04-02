import { Fab, styled } from "@mui/material"
import { AddIcon } from "../icons/AddIcon"

const StyledFab = styled(Fab)(({ theme }) => ({
  position: 'absolute',
  right: theme.spacing(5),
  bottom: theme.spacing(10),
  [theme.breakpoints.up('sm')]: {
    display: 'none',
  }
}))

type MemoCreateFabProps = {
  transitionCreatePage: () => void
}

const MemoCreateFab: React.FC<MemoCreateFabProps> = ({ transitionCreatePage }): JSX.Element => {
  const handleFabClick = () => {
    transitionCreatePage()
  }

  return (
    <StyledFab
      onClick={handleFabClick}>
      <AddIcon />
    </StyledFab>
  )
}

export default MemoCreateFab