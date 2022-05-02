import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material'
import { DragEvent, useContext } from 'react'
import { UIContext } from '../../context/ui'
import { Entry } from '../../interfaces'

interface Props {
  entry: Entry
}

export const EntryCard = ({entry}: Props) => {
  const {startDragging, endDragging} = useContext(UIContext)

  const onDragStart = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('text', entry._id)
    // todo: modificar el estado, para indicar que estoy haciendo drag
    startDragging()
  }

  const onDragEnd = () => {
    // todo: finalizar el drag
    endDragging()
  }

  return (
    <Card sx={{marginBottom: 1}} draggable onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: 'pre-line' }}>{entry.description}</Typography>
        </CardContent>
        
        <CardActions sx={{display:'flex', justifyContent: 'end', paddingRight: 2}}>
          <Typography variant='body2'>hace 30 minutos</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  )
}
