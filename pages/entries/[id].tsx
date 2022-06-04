import {capitalize,  Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, IconButton } from '@mui/material'
import React, { ChangeEvent, useContext, useMemo, useState } from 'react'
import { Layout } from '../../components/layouts'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Entry, EntryStatus } from '../../interfaces';
import { GetServerSideProps } from 'next';
import { dbEntries } from '../../app/use-cases';
import { EntriesContext } from '../../context/entries';
import { useRouter } from 'next/router';
import { dateFunctions } from '../../utils';

const validStatus:  EntryStatus[] = ['pending', 'in-progress', 'finish']

interface Props {
  entry: Entry
}


const EntryPage = ({entry}: Props) => {
  const {updateEntry, deleteEntry} = useContext(EntriesContext)
  const [inputValue, setInputValue] = useState(entry.description)
  const [status, setStatus] = useState<EntryStatus>(entry.status)
  const [touched, setTouched] = useState(false)
  const router = useRouter()

  const isNotValid = useMemo(() => inputValue.length <= 0  && touched, [inputValue, touched])

  const onInputValueChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }
  

  const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value as EntryStatus)
  }

  const onSave = () => {
    if (inputValue.trim().length === 0 ) return;
    const updatedEntry: Entry = {
     ...entry,
     status,
     description: inputValue
    }
    updateEntry(updatedEntry, true);
    router.push('/')
  }

  const onDelete = () => {
    deleteEntry(entry._id)
    router.push('/')
  }


  return (
    <Layout title='entries'>
      <Grid
        container
        justifyContent='center'
        sx={{marginTop:2}}
      >
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader title={`Entrada ${inputValue}`} subheader={`Creada ${dateFunctions.getFormatDistanceToNow(entry.createdAt)}`} />
            <CardContent>
              <TextField sx={{marginTop: 2 , marginBottom: 1}}
                fullWidth
                placeholder='Nueva Entrada'
                autoFocus
                multiline
                label='Nuava entrada'
                value={inputValue}
                onBlur={() => setTouched(true)}
                onChange={onInputValueChanged}
                helperText={isNotValid && 'Ingrese un valor'}
                error= {isNotValid}
              />
              <FormControl>
                <FormLabel>Estado:</FormLabel>
                <RadioGroup row value={status} onChange={onStatusChanged}>
                  {
                    validStatus.map((option) => (
                      <FormControlLabel key={option} value={option} control={<Radio />} label={capitalize(option)} />
                    ))
                  }
                </RadioGroup>
              </FormControl>
            </CardContent>
            {/* RADIO */}
            <CardActions>
              <Button startIcon={<SaveOutlinedIcon />}
                variant='contained'
                fullWidth
                onClick={onSave}
                disabled= { inputValue.length <= 0 }
              >Save</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <IconButton sx={{position: 'fixed', bottom: 30, right: 30, backgroundColor: 'error.dark'}} onClick={onDelete}>
        <DeleteOutlinedIcon />
      </IconButton>
    </Layout>
  )
}


export const getServerSideProps: GetServerSideProps = async ({params}) => {
  const {id} = params as {id: string}
  const entry = await dbEntries.getEntryId(id);

  if (!entry) {
    return {
      redirect: {
        destination: '/',
        permanent: false // pagina sigue existiendo, solo que el id no existe
      }
    }
  }

  return {
    props: {entry}
  }
}



export default EntryPage