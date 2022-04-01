import { Box, IconButton, Input, InputAdornment, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, styled, TextField, ToggleButton, Toolbar, Typography } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import api from "../apis/$api"
import { Memo } from "../apis/@types"
import useMediaSize from "../hooks/useMediaSize"
import { BookmarkBorderIcon } from "./icons/BookmarkBorderIcon"
import { BookmarkIcon } from "./icons/BookmarkIcon"
import { DeleteIcon } from "./icons/DeleteIcon"
import apiClient from "../lib/apiClient"
import MemoListItem from "./MemoListItem"

const MemoListBase = styled(List)(({theme}) => ({
  flexGrow: 1,
  overflowY: 'scroll',
  width: '100%',
  marginTop: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.mixins.toolbar.minHeight
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
      dense
      subheader={<ListItem/>}>
      {memos.map(memoList => (
        <ListItem key={`list-${memoList[0].createdDate}`} disablePadding>
          <ItemList disablePadding>
            <ListSubheader disableGutters>
              {memoList[0].createdDate}
            </ListSubheader>
            {memoList.map(memo => (
              <MemoListItem
                key={memo.id}
                memo={memo}/>
            ))}
          </ItemList>
        </ListItem>
      ))}
    </MemoListBase>
  )
}

export default MemoList