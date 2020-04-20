import React, { useState } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import SearchByCounty from './SearchByCounty'
import SearchByState from './SearchByState'
import SearchByZipCode from './SearchByZipCode'
import TabSelector from './TabSelector'

const COUNTY = 'COUNTY'
const STATE = 'STATE'
const ZIP = 'ZIP'

const searchOptions = [
  { id: COUNTY, content: 'County' },
  { id: STATE, content: 'State' },
  { id: ZIP, content: 'Zip' },
]

export default function SearchView(props) {
  const { className } = props

  const [activeTabId, setActiveTabId] = useState(COUNTY)

  function handleChange(e) {
    setActiveTabId(e.target.id)
  }

  return (
    <div className={cn('', className)}>
      <h4>Search by</h4>
      <TabSelector activeTabId={activeTabId} onChange={handleChange} tabList={searchOptions} />
      {activeTabId === ZIP && <SearchByZipCode />}
      {activeTabId === STATE && <SearchByState />}
      {activeTabId === COUNTY && <SearchByCounty />}
    </div>
  )
}

SearchView.propTypes = {
  className: PropTypes.string,
}

SearchView.defaultProps = {
  className: '',
}
