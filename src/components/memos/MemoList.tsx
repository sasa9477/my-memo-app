import { Box, IconButton, Input, InputAdornment, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, styled, TextField, ToggleButton, Toolbar, Typography } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import { Memo } from "../../apis/@types"
import MemoListItem from "./MemoListItem"

const MemoListBase = styled(List)(({ theme }) => ({
  flexGrow: 1,
  overflowY: 'scroll',
  [theme.breakpoints.up('sm')]: {
    marginTop: theme.spacing(1)
  }
}))

const ItemList = styled(List)({
  width: '100%',
})

type MemoListProps = {
  memos: Memo[][]
}

const MemoList: React.FC<MemoListProps> = ({ memos }): JSX.Element => {
  return (
    <MemoListBase
      disablePadding>
      {memos.map(memoList => (
        <ListItem key={`list-${memoList[0].createdDate}`} disablePadding>
          <ItemList disablePadding>
            <ListSubheader disableGutters>
              {memoList[0].createdDate}
            </ListSubheader>
            {memoList.map(memo => (
              <MemoListItem
                key={memo.id}
                memo={memo} />
            ))}
          </ItemList>
        </ListItem>
      ))}
    </MemoListBase>
  )
}

export default MemoList