import {createContext} from 'react'

interface ContextProps {
  sideMenuOpen: boolean;
  isAddingEntry: boolean;

  closeSideMenu: () => void;
  openSideMenu: () => void;
  setIsAddingEntry: (isAdding: boolean) => void;
}

export const UIContext = createContext({} as ContextProps)