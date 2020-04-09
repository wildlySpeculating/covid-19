import React from 'react'
import PropTypes from 'prop-types'

import SearchButton from './SearchButton'
import SearchContextProvider from './SearchContextProvider'
import SearchInput from './SearchInput'
import SearchLabel from './SearchLabel'
import SearchSuggestion from './SearchSuggestion'
import SearchSuggestionList from './SearchSuggestionList'

export default function Search(props) {
  const { children, handleSearch } = props

  return <SearchContextProvider handleSearch={handleSearch}>{children}</SearchContextProvider>
}

Search.Button = SearchButton
Search.Input = SearchInput
Search.Label = SearchLabel
Search.Suggestion = SearchSuggestion
Search.SuggestionList = SearchSuggestionList

Search.propTypes = {
  children: PropTypes.node.isRequired,
  handleSearch: PropTypes.func.isRequired,
}
