import React, { useState } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import StateResults from './StateResults'
import SearchBy from './SearchBy'
import useCovidData from '../Hooks/useCovidData'

export default function SearchByState(props) {
  const { className } = props

  const [searchTerm, setSearchTerm] = useState('')
  const [selection, setSelection] = useState(null)
  const [allowSuggestions, setAllowSuggestions] = useState(null)

  const { getStateSearchSuggestions } = useCovidData()

  function handleChange(e) {
    setAllowSuggestions(true)
    setSearchTerm(e.target.value)
  }

  function handleSuggestionSelect(selectedSuggestion) {
    const { displayText } = selectedSuggestion

    setAllowSuggestions(false)
    setSearchTerm(displayText)
    setSelection(selectedSuggestion)
  }

  const selectedStateFips = selection && selection.value.fips

  return (
    <div className={cn('', className)}>
      <SearchBy
        allowSuggestions={allowSuggestions}
        getSearchSuggestions={getStateSearchSuggestions}
        handleChange={handleChange}
        handleSelect={handleSuggestionSelect}
        id={'stateSearch'}
        labelText={'State name'}
        searchTerm={searchTerm}
      />

      {selectedStateFips && <StateResults fips={selectedStateFips} />}
    </div>
  )
}

SearchByState.propTypes = {
  className: PropTypes.string,
}

SearchByState.defaultProps = {
  className: '',
}
