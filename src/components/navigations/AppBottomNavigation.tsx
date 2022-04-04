import { BottomNavigation, BottomNavigationAction, Paper, styled, Tab, Tabs } from "@mui/material"
import { SyntheticEvent, useEffect, useRef, useState } from "react"
import { AccountCircleIcon } from "../icons/AccountCircleIcon"
import { EditIcon } from "../icons/EditIcon"

const AppBottomNavigationBase = styled(Paper)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    display: 'none'
  }
}))

type AppBottomNavigationProps = {
  transitionHomePage: () => void,
  transitionProfilePage: () => void
}

const AppBottomNavigation: React.FC<AppBottomNavigationProps> = ({ transitionHomePage, transitionProfilePage }): JSX.Element => {
  const [index, setIndex] = useState(0)

  const handleNavigationChange = (event: SyntheticEvent, newIndex: number) => {
    event.preventDefault()
    setIndex(newIndex)

    switch (newIndex) {
      case 1:
        transitionProfilePage()
        break;

      default:
        transitionHomePage()
        break;
    }
  }

  return (
    <AppBottomNavigationBase>
      <BottomNavigation
        showLabels
        value={index}
        onChange={handleNavigationChange}>
        <BottomNavigationAction
          icon={<EditIcon />}
          label='メモ' />
        <BottomNavigationAction
          icon={<AccountCircleIcon />}
          label='アカウント' />
      </BottomNavigation>
    </AppBottomNavigationBase>
  )
}

export default AppBottomNavigation