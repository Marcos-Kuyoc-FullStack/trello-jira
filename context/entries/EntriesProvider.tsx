import { ReactNode, useReducer} from 'react'
import {v4 as uuidv4} from 'uuid';
import { Entry } from '../../interfaces';
import { EntriesContext, entriesReducer } from './';

export interface EntriesState {
 entries: Entry[];
}

interface Props{
  children: ReactNode
}

const Entries_INITIAL_STATE:EntriesState = {
 entries: [
   {
     _id: uuidv4(),
     description: '[pending] lorem',
     status: 'pending',
     createdAt: Date.now()
   },
   {
    _id: uuidv4(),
    description: '[in-progress] lorem lorem',
    status: 'in-progress',
    createdAt: Date.now() - 1000000
  },
  {
    _id: uuidv4(),
    description: '[finish] lorem lorem lorem',
    status: 'finish',
    createdAt: Date.now() - 100000
  }
 ]
}


export const EntriesProvider = ({children}: Props) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)

  return (
    <EntriesContext.Provider value={{
      ...state
    }}>
      {children}
    </EntriesContext.Provider>
  )
};
