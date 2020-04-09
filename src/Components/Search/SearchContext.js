import { createContext } from 'react'

export const defaultContext = {
  searchTerm: '',
}

const SearchContext = createContext(defaultContext)

export default SearchContext
