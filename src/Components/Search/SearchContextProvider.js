import React, { useMemo, useReducer } from 'react'
import PropTypes from 'prop-types'

import SearchContext, { defaultContext } from './SearchContext'
// TODO: revove this file

const initialState = defaultContext

function initializeState() {
  return initialState
}

export const ACTION_TYPES = {
  SET_SEARCH_TERM: 'SET_SEARCH_TERM',
  RESET: 'RESET',
}

function searchContextReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.SET_SEARCH_TERM:
      return { ...state, searchTerm: action.payload }

    case ACTION_TYPES.RESET:
      return initializeState(action.payload)
    default:
      throw new Error()
  }
}

export default function SearchContextProvider(props) {
  const { children, handleSearch } = props

  const [searchContextState, searchContextDispatch] = useReducer(
    searchContextReducer,
    initialState
    // initializeState
  )

  const searchContextValue = useMemo(
    () => [searchContextState, searchContextDispatch, handleSearch],
    [searchContextState, searchContextDispatch, handleSearch]
  )

  // console.log('searchContextState', searchContextState)

  return <SearchContext.Provider value={searchContextValue}>{children}</SearchContext.Provider>
}

SearchContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
