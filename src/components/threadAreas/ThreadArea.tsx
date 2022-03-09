import { List, ListItem, ListSubheader } from '@mui/material';
import React, { FC, useEffect, useRef } from 'react';
import MemoViewModel from '../../models/MemoViewModel';
import MemoContents from './MemoContents';

type ThreadAreaProps = {
  memosGroupedByDate: Map<string, MemoViewModel[]>
  // handleEdit: (memo: MemoViewModel) => Promise<void>
  // handleDelete: (memoId: number) => Promise<void>
  loadMemosRequest: () => Promise<void>
}

const ThreadArea: FC<ThreadAreaProps> = ({ memosGroupedByDate, loadMemosRequest }): JSX.Element => {
  const endOfContentRef = useRef<HTMLDivElement>(null)

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
                  <MemoContents
                    key={`item-${date}-${memo.id}`}
                    memo={memo}
                    loadMemosRequest={loadMemosRequest}
                  />
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