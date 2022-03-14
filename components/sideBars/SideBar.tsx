import React from 'react';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';

type SideBarProps = { sideBarWidth: number };

const SideBar = ({sideBarWidth}: SideBarProps): JSX.Element => {
  const menuItems = ['メモ', '英単語'];

  return (
      <Drawer
        sx={{ width: sideBarWidth }}
        variant="permanent"
        anchor="left"
      >
        <List>
          {menuItems.map((text) => (
            <ListItem
              button
              key={text}>
              <ListItemText
                primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
  );
};

export default SideBar;
