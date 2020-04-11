import React, { useState } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import CountyResults from './CountyResults'
import SearchBy from './SearchBy'
import useCovidData from '../Hooks/useCovidData'

export default function SearchByZipCode(props) {
  const { className } = props

  const [searchTerm, setSearchTerm] = useState('')
  const [selection, setSelection] = useState(null)

  const { getCountySearchSuggestionsByZip } = useCovidData()

  function handleChange(e) {
    setSearchTerm(e.target.value)
  }

  function handleSuggestionSelect(selectedSuggestion) {
    const { displayText } = selectedSuggestion

    setSearchTerm(displayText)
    setSelection(selectedSuggestion)
  }

  const selectedCountyFips = selection && selection.value.fips

  return (
    <div className={cn('', className)}>
      <SearchBy
        getSearchSuggestions={getCountySearchSuggestionsByZip}
        handleChange={handleChange}
        handleSelect={handleSuggestionSelect}
        id={'zipSeach'}
        labelText={'County name'}
        searchTerm={searchTerm}
      />

      {selectedCountyFips && <CountyResults fips={selectedCountyFips} />}
    </div>
  )
}

SearchByZipCode.propTypes = {
  className: PropTypes.string,
}

SearchByZipCode.defaultProps = {
  className: '',
}
