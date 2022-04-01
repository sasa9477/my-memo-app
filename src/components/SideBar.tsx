import { Box, Drawer, List, ListItem, ListItemText, styled } from "@mui/material"
import { useSession } from "next-auth/react"
import { default as NextLink } from "next/link"
import UserCard from "./UserCard"

type SideBarProps = {
  sideBarWidth: number
}

const SideBar: React.FC<SideBarProps> = ({ sideBarWidth }): JSX.Element => {
  const { data, status } = useSession();

  if (status === "loading")
  {
    return (
      <p>
        loading...
      </p>
    )
  }

  const SideBarBase = styled(Box)(({theme}) => ({
    width: sideBarWidth,
    flexShrink: 0,
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    },
  }))

  const StyledDrawer = styled(Drawer)(({ theme }) => ({
    display: 'block',
    '& .MuiDrawer-paper': {
      boxSizing: 'border-box',
      width: sideBarWidth
    }
  }))

  return (
    <SideBarBase>
      <StyledDrawer
        variant='permanent'
        open>
        <List>
          <UserCard user={data!.user}/>
          <NextLink href='/' passHref>
            <ListItem button component='a'>
              <ListItemText primary='メモ'/>
            </ListItem>
          </NextLink>
      </List>
      </StyledDrawer>
    </SideBarBase>
  )
}

export default SideBar