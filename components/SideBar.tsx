import { Divider, List, ListItem, ListItemText } from '@mui/material';
import { signOut } from 'next-auth/react';
import React from 'react';

const SideBar = (): JSX.Element => {
  const menuItems = ['メモ', '英単語']

  return (
    <List>
      {menuItems.map((text) => (
        <ListItem
          button
          key={text}>
          <ListItemText
            primary={text} />
        </ListItem>
      ))}
      <Divider/>
      <ListItem button key="signout" onClick={() => signOut()}>
        <ListItemText primary='サインアウト'/>
      </ListItem>
    </List>
  )
}

export default SideBar
