import { type } from 'os';
import { ReactNode, useReducer} from 'react'
import { UIContext, uiReducer } from './';

export interface UIState {
  sideMenuOpen: boolean;
  isAddingEntry: boolean
}
interface Props{
  children: ReactNode
}
const UI_INITIAL_STATE: UIState = {
  sideMenuOpen: false,
  isAddingEntry: false
}


export const UIProvider = ({children}: Props) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)

  const openSideMenu = () => {
    dispatch({type: 'UI - Open Sidebar'})
  }

  const closeSideMenu = () => {
    dispatch({type: 'UI - Close Sidebar'})
  }

  const setIsAddingEntry = (isAdding: boolean) => {
    dispatch({type: 'UI - Set isAddingEntry', payload: isAdding})
  }

  return (
    <UIContext.Provider value={{
      ...state,
      closeSideMenu,
      openSideMenu,
      setIsAddingEntry
    }}>
      {children}
    </UIContext.Provider>
  )
}
