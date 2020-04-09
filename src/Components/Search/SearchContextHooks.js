import { useContext, useMemo, useCallback } from 'react'

import SearchContext from './SearchContext'
import { ACTION_TYPES } from './SearchContextProvider'

export default function useSearchContextHooks() {
  const [SearchContextState, searchContextDispatch, handleSearch] = useContext(SearchContext)

  const searchTerm = useMemo(() => {
    return SearchContextState.searchTerm
  }, [SearchContextState])

  const setSearchTerm = useCallback(
    (term) => {
      searchContextDispatch({ type: ACTION_TYPES.SET_SEARCH_TERM, payload: term })
    },
    [searchContextDispatch]
  )

  const search = useCallback(() => {
    handleSearch(searchTerm)
  }, [searchTerm, handleSearch])

  return { searchTerm, setSearchTerm, search }
}
