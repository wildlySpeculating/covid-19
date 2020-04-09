import React, { useState } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import CountyResults from './CountyResults'
import SearchBy from './SearchBy'
import useCovidData from '../Hooks/useCovidData'

export default function SearchByCounty(props) {
  const { className } = props

  const [searchTerm, setSearchTerm] = useState('')
  const [selection, setSelection] = useState(null)

  const { getCountySearchSuggestionsByCountyName } = useCovidData()

  function handleChange(e) {
    setSearchTerm(e.target.value)
  }

  function handleSuggestionSelect(selectedSuggestion) {
    const { displayText } = selectedSuggestion
    setSearchTerm(displayText)
    setSelection(selectedSuggestion)
  }

  const selectedCountyFips = selection && selection.value

  return (
    <div className={cn('', className)}>
      <SearchBy
        getSearchSuggestions={getCountySearchSuggestionsByCountyName}
        handleChange={handleChange}
        handleSelect={handleSuggestionSelect}
        headingText={'Seach by county'}
        id={'countySearch'}
        labelText={'County name'}
        searchTerm={searchTerm}
      />

      {selectedCountyFips && <CountyResults fips={selectedCountyFips} />}
    </div>
  )
}

SearchByCounty.propTypes = {
  className: PropTypes.string.isRequired,
}
