import { List, ListItem, ListItemText } from '@mui/material';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

const SideBar = (): JSX.Element => {
  return (
    <List>
      <Link href='/' passHref>
        <ListItem button component='a'>
          <ListItemText primary='メモ'/>
        </ListItem>
      </Link>
      <Link href='/license' passHref>
        <ListItem button component='a'>
          <ListItemText primary='ライセンス'/>
        </ListItem>
      </Link>
      <ListItem button onClick={() => signOut()}>
        <ListItemText primary='サインアウト'/>
      </ListItem>
    </List>
  )
}

export default SideBar
