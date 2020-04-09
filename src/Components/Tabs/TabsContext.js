import { createContext } from 'react'

export const defaultContext = {
  activeTabId: null,
  onChange: () => {},
}

const TabsContext = createContext(defaultContext)

export default TabsContext
