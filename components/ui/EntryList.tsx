import { useContext, useMemo } from 'react'
import { List, Paper } from '@mui/material'
import { EntriesContext } from '../../context/entries'
import { EntryStatus } from '../../interfaces'
import { EntryCard } from './EntryCard'

interface Props {
  status: EntryStatus 
}

export const EntryList = ({status}: Props) => {
  const {entries} = useContext(EntriesContext)

  const entriesByStatus = useMemo(() => entries.filter(entry => entry.status === status), [entries]);

  return (
    <div>
      <Paper sx={{
        height: 'calc(100vh - 180px)',
        overflow: 'scroll',
        backgroundColor: 'transparent',
        padding: '3px 5px'
      }}>
        <List sx={{ opacity: 1}}>
          {
            entriesByStatus.map(entry => (
              <EntryCard key={ entry._id} entry={entry}></EntryCard>
            ))
          }
        </List>
      </Paper>
    </div>
  )
}
