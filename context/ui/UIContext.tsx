import {createContext} from 'react'

interface ContextProps {
  sideMenuOpen: boolean;
  closeSideMenu: () => void;
  openSideMenu: () => void;
}

export const UIContext = createContext({} as ContextProps)