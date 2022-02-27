import { List, ListItem, ListItemText, ListSubheader, Typography } from '@mui/material';
import React, { FC, useEffect, useRef } from 'react';
import MemoViewModel from '../../../models/MemoViewModel';

type ThreadAreaProps = {
  memosGroupedByDate: Map<string, MemoViewModel[]>
}

const ThreadArea: FC<ThreadAreaProps> = ({ memosGroupedByDate }): JSX.Element => {
  const endOfContentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endOfContentRef.current?.scrollIntoView()
  },[ memosGroupedByDate ])

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
                <ListSubheader sx={{ textAlign: 'center' }}>
                  {date}
                </ListSubheader>
                {memoList.map((memo) => (
                  <ListItem
                    key={`item-${date}-${memo.id}`}
                    sx={{ paddingX: '0.2em', paddingY: '0.5em' }}>
                  <ListItemText
                    primary={
                      <Typography
                        fontSize='0.8em'>
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