import { ReactNode, useReducer, useEffect} from 'react'
import {v4 as uuidv4} from 'uuid';
import { entriesApi } from '../../app/apis';
import { Entry } from '../../interfaces';
import { EntriesContext, entriesReducer } from './';

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

  const addNewEntry = (description: string) => {
    const newEntry: Entry = {
      _id: uuidv4(),
      description,
      createdAt: Date.now(),
      status: 'pending'
    }

    dispatch({type: '[Entry] Add-Entry', payload: newEntry})
  }

  const updteEntry = (entry: Entry) => {
    dispatch({type: '[Entry] Entry-Updated', payload: entry})
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
      updteEntry
    }}>
      {children}
    </EntriesContext.Provider>
  )
};
