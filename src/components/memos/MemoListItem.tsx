import { Box, IconButton, Input, InputAdornment, InputBase, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, styled, TextField, ToggleButton, Toolbar, Typography } from "@mui/material"
import { KeyboardEvent, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Memo } from "../../apis/@types"
import useMediaSize from "../../hooks/useMediaSize"
import { BookmarkBorderIcon } from "../icons/BookmarkBorderIcon"
import { BookmarkIcon } from "../icons/BookmarkIcon"
import { DeleteIcon } from "../icons/DeleteIcon"
import apiClient from "../../lib/apiClient"
import { SearchRequest } from "./MemoPage"

const ContentBox = styled(Box)(({ theme }) => ({
  width: '100%',
  marginLeft: theme.spacing(1)
}))

type MemoListItemProps = {
  memo: Memo,
  searchRequest: SearchRequest
}

const MemoListItem: React.FC<MemoListItemProps> = ({ memo, searchRequest }): JSX.Element => {
  const { isMobileSize } = useMediaSize()
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [bookmark, setBookmark] = useState(memo.bookmarkFlag)

  const updateMemo = useCallback(async () => {
    if (inputRef.current) {
      memo.content = inputRef.current.value
      memo.bookmarkFlag = bookmark
      const result = await apiClient.memos.update.$put({ body: memo })
      console.log('update memo! ', result)
      searchRequest(false)
    }
  }, [memo, bookmark, searchRequest])

  const deleteMemo = useCallback(async (memoId: number) => {
    await apiClient.memos.delete.$delete({ query: { memoId: memoId } })
    searchRequest(false)
  }, [searchRequest])

  const handleBookmarkButtonClick = async () => {
    setBookmark(bookmark => !bookmark)
  }

  const handleInputKeyDown = async (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === 'Enter' && inputRef.current) {
      e.preventDefault()
      inputRef.current.blur()
    }
  }

  const handleInputBlur = async () => {
    if (inputRef.current) {
      inputRef.current.value = inputRef.current.value.trim().removeConsecutiveNewlines()

      if (inputRef.current.value.length === 0) {
        await deleteMemo(memo.id)
        return
      }

      if (inputRef.current.value !== memo.content) {
        await updateMemo()
      }
    }
  }

  const handleDeleteIconClick = async () => {
    await deleteMemo(memo.id)
  }

  useEffect(() => {
    (async () => {
      if (bookmark !== memo.bookmarkFlag) {
        await updateMemo()
      }
    })()
  }, [bookmark, memo, updateMemo])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = memo.content
    }
  }, [memo])

  return (
    <ListItem key={memo.id} disablePadding>
      <IconButton
        size="small"
        onClick={handleBookmarkButtonClick}>
        {bookmark ? <BookmarkIcon /> : <BookmarkBorderIcon />}
      </IconButton>
      <ContentBox>
        <ListItemText
          primary={
            <Typography
              fontSize='0.9em'
              color='gray'>
              {memo.updatedDatetime ? `${memo.createdTime} ( ${memo.updatedDatetime} 更新 )` : memo.createdTime}
            </Typography>} />
        <Input
          fullWidth
          margin='none'
          multiline
          disableUnderline
          inputRef={inputRef}
          spellCheck={false}
          autoComplete='off'
          endAdornment={(!isMobileSize) ? null :
            <InputAdornment position='end'>
              <IconButton onClick={handleDeleteIconClick}>
                <DeleteIcon />
              </IconButton>
            </InputAdornment>}
          onKeyDown={handleInputKeyDown}
          onBlur={handleInputBlur} />
      </ContentBox>
    </ListItem>
  )
}

export default MemoListItem