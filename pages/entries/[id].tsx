import {capitalize,  Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, IconButton } from '@mui/material'
import React from 'react'
import { Layout } from '../../components/layouts'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { EntryStatus } from '../../interfaces';

const validStatus:  EntryStatus[] = ['pending', 'in-progress', 'finish']

const EntryPage = () => {
  return (
    <Layout title='hola'>
      <Grid
        container
        justifyContent='center'
        sx={{marginTop:2}}
      >
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader title='Entrada' subheader={'Creada hace ...'} />
            <CardContent>
              <TextField sx={{marginTop: 2 , marginBottom: 1}}
                fullWidth
                placeholder='Nueva Entrada'
                autoFocus
                multiline
                label='Nuava entrada'
              />
              <FormControl>
                <FormLabel>Estado:</FormLabel>
                <RadioGroup row>
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
              >Save</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <IconButton sx={{position: 'fixed', bottom: 30, right: 30, backgroundColor: 'error.dark'}}>
        <DeleteOutlinedIcon />
      </IconButton>
    </Layout>
  )
}

export default EntryPage