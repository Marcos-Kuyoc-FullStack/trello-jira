import { ReactNode, useReducer, useEffect} from 'react'
import {v4 as uuidv4} from 'uuid';
import { entriesApi } from '../../app/apis';
import { Entry } from '../../interfaces';
import { EntriesContext, entriesReducer } from './';
import { useSnackbar } from 'notistack';

export interface EntriesState {
 entries: Entry[];
}

interface Props{
  children: ReactNode
}

const Entries_INITIAL_STATE:EntriesState = {
 entries: []
}

export const EntriesProvider = ({children}: Props) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)
  const {enqueueSnackbar} = useSnackbar()

  const addNewEntry = async (description: string) => {
    try {
      const {data} =  await entriesApi.post<Entry>('/entries', {description})
  
      dispatch({type: '[Entry] Add-Entry', payload: data})
    } catch (error: any) {
      console.error(error.message);
    }
  }

  const updateEntry = async({_id, description, status}: Entry, showSnackbar = false) => {
    try {
      const {data} =  await entriesApi.put<Entry>(`/entries/${_id}`, {description, status})
      dispatch({type: '[Entry] Entry-Updated', payload: data})
      // TODO: mostrar snakbar
      if (showSnackbar) {
        enqueueSnackbar('Entrada Actualizada', {
          variant: 'success',
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right'
          }
        })
      }

    } catch (error: any) {
      console.error(error.message);
    }
  }

  const deleteEntry =async (id:string) => {
    try {
      await entriesApi.delete<Entry[]>(`/entries/${id}`)
      refreshEntries()
      enqueueSnackbar('Entrada eliminada', {
        variant: 'success',
        autoHideDuration: 1500,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right'
        }
      })
    } catch (error: any) {
      console.error(error.message);
    }
  }

  const refreshEntries = async () => {
    const {data} = await entriesApi.get<Entry[]>('/entries');
    dispatch({type: '[Entry] Entry-Load', payload: data})
  }
  
  useEffect(() => {
    refreshEntries()
  }, [])


  return (
    <EntriesContext.Provider value={{
      ...state,
      //methods
      addNewEntry,
      updateEntry,
      deleteEntry
    }}>
      {children}
    </EntriesContext.Provider>
  )
};
