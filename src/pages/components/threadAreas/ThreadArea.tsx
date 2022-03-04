import { IconButton, List, ListItem, ListItemText, ListSubheader, Stack, Typography } from '@mui/material';
import React, { FC, useCallback, useEffect, useRef } from 'react';
import { useMemoApi } from '../../../hooks/useMemoApi';
import MemoViewModel from '../../../models/MemoViewModel';
import { DeleteIcon, EditIcon } from '../../icons/IconPack';

type ThreadAreaProps = {
  memosGroupedByDate: Map<string, MemoViewModel[]>
  // handleEdit: (memo: MemoViewModel) => Promise<void>
  // handleDelete: (memoId: number) => Promise<void>
  loadMemosRequest: () => Promise<void>
}

const ThreadArea: FC<ThreadAreaProps> = ({ memosGroupedByDate, loadMemosRequest }): JSX.Element => {
  const endOfContentRef = useRef<HTMLDivElement>(null)

  const { deleteMemo } = useMemoApi()

  const handleDelete = useCallback(
    async (memoId: number) => {
      await deleteMemo(memoId)
      await loadMemosRequest()
    }, []
  )

  useEffect(() => {
    endOfContentRef.current?.scrollIntoView()
  },[])

  return (
    <List
      sx={{
        flexGrow: 1,
        marginY: '10px',
        overflowY: 'scroll',
        padding: 0
      }}>
      {(() => {
        const jsxElements = new Array<JSX.Element>()
        memosGroupedByDate.forEach((memoList, date) => {
          jsxElements.push(
            <ListItem key={date} sx={{ paddingX: 0 }}>
              <List>
                <ListSubheader>
                  {date}
                </ListSubheader>
                {memoList.map((memo) => (
                  <ListItem
                    key={`item-${date}-${memo.id}`}
                    alignItems='flex-start'
                    sx={{ paddingX: '0.2em', paddingY: '0.5em' }}>
                    <Stack>
                      <IconButton>
                        <EditIcon
                          fontSize='small'/>
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(memo.id)}>
                        <DeleteIcon
                          fontSize='small'/>
                      </IconButton>
                    </Stack>
                    <ListItemText
                      primary={
                        <Typography
                          fontSize='0.9em'
                          color='gray'>
                          {memo.time}
                        </Typography>
                      }
                      secondary={
                        <Typography display="inline">
                        {memo.content.split("\n").map((line, key) => <span key={key}>{line}<br/></span>)}
                        </Typography>
                      }/>
                  </ListItem>
                ))}
              </List>
            </ListItem>
          )
        })
        return jsxElements
      })()}
      <div ref={endOfContentRef}/>
    </List>
  )
}

export default ThreadArea