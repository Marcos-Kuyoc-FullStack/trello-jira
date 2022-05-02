import { Button , Box, TextField} from '@mui/material'
import React, { ChangeEvent, useContext, useState } from 'react'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { EntriesContext } from '../../context/entries';

export const NewEntry = () => {
  const {addNewEntry} = useContext(EntriesContext)
  const [isAddig, setIsAddig] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [touched, setTouched] = useState(false)

  const onTextFieldChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const onSave = () => {
    if (inputValue.length === 0) return;
    addNewEntry(inputValue)
    setIsAddig(false)
    setTouched(false)
    setInputValue('')
  }

  return (
    <Box sx={{marginBottom: 2, paddingX: 2}}>
      {
        isAddig ? (
          <>
            <TextField
              fullWidth
              sx={{marginTop: 2, marginBottom: 1}}
              placeholder='Nueva entrada'
              multiline
              label='Nueva entrada'
              helperText={inputValue.length <= 0 && touched && 'Ingrese un valor'}
              error={inputValue.length <= 0 && touched}
              value={inputValue}
              onChange={onTextFieldChanged}
              onBlur = {() => setTouched(true)}
            />
            <Box display='flex' justifyContent='space-between'>
              <Button variant='text'
              onClick={() => setIsAddig(false)}
              >
                Cancelar
              </Button>
              <Button variant='outlined' onClick={onSave} color='secondary' endIcon={<SaveOutlinedIcon />}>
                Guardar
              </Button>
            </Box>
          </>
        )
        :
        (
          <Button
              startIcon={<AddCircleOutlineOutlinedIcon />}
              fullWidth
              variant='outlined'
              onClick={() => setIsAddig(true)}
            >
                Agregar Tarea
            </Button>
        )
      }
    </Box>
  )
}
