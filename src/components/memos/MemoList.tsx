import { Box, IconButton, Input, InputAdornment, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, styled, TextField, ToggleButton, Toolbar, Typography } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import { Memo, SearchQuery } from "../../apis/@types"
import apiClient from "../../lib/apiClient"
import MemoListItem from "./MemoListItem"
import { SearchRequest, SearchResult } from "./MemoPage"

const MemoListBase = styled(List)(({ theme }) => ({
  padding: 0,
  flexGrow: 1,
  overflowY: 'scroll',
  marginTop: theme.spacing(1),
  [theme.breakpoints.up('sm')]: {
    marginTop: theme.spacing(1)
  }
}))

const ItemList = styled(List)({
  width: '100%',
  padding: 0
})

type MemoListProps = {
  searchResult: SearchResult,
  searchRequest: SearchRequest
}

const MemoList: React.FC<MemoListProps> = ({ searchResult, searchRequest }): JSX.Element => {
  const endElementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (searchResult.scrollEndElement && endElementRef.current) {
      endElementRef.current.scrollIntoView()
    }
  }, [searchResult])

  return (
    <MemoListBase>
      {searchResult.memos.map(memoList => (
        <ListItem
          key={`list-${memoList[0].createdDate}`}
          disablePadding>
          <ItemList>
            <ListSubheader
              disableGutters>
              {memoList[0].createdDate}
            </ListSubheader>
            {memoList.map(memo => (
              <MemoListItem
                key={memo.id}
                memo={memo}
                searchRequest={searchRequest} />
            ))}
          </ItemList>
        </ListItem>
      ))}
      <div ref={endElementRef}></div>
    </MemoListBase>
  )
}

export default MemoList