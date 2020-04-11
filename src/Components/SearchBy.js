import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

import Search from './Search/Search'
import ViewTitle from './ViewTitle'

export default function SearchBy(props) {
  const {
    allowSuggestions,
    getSearchSuggestions,
    handleChange,
    handleSelect,
    headingText,
    id,
    searchTerm,
  } = props

  const searchSuggestions = useMemo(() => {
    return (searchTerm && getSearchSuggestions(searchTerm)) || []
  }, [searchTerm, getSearchSuggestions])

  const showSearchSuggestions = allowSuggestions && searchSuggestions.length > 0

  function handleSearch() {
    if (searchSuggestions.length === 1) {
      handleSelect(searchSuggestions[0])
    }
  }

  return (
    <div className="o-grid  u-margin-bot">
      <div className="o-grid__item  u-1/1">
        <ViewTitle>{headingText}</ViewTitle>
      </div>
      <div className="o-grid__item  u-1/1">
        <div className="o-grid  o-grid--justify-center">
          <div className="o-grid__item  u-1/1  u-2/3@tablet  u-padding-sides  u-padding-sides-none@tablet">
            <div className="o-grid">
              <Search.Input
                className="o-grid__item  u-1/1"
                handleSubmit={handleSearch}
                id={id}
                onChange={handleChange}
                value={searchTerm}
              />
              {showSearchSuggestions && (
                <Search.SuggestionList className="o-grid__item  u-1/1">
                  {searchSuggestions.map((item) => (
                    <Search.Suggestion
                      className="u-font-size-tiny"
                      key={item.displayText}
                      onClick={() => {
                        handleSelect(item)
                      }}
                    >
                      {item.displayText}
                    </Search.Suggestion>
                  ))}
                </Search.SuggestionList>
              )}
            </div>
          </div>
          <div className="o-grid__item  o-grid__item--shrink  u-show@tablet">
            <Search.Button onClick={handleSearch}>See results</Search.Button>
          </div>
        </div>
      </div>
    </div>
  )
}

SearchBy.propTypes = {
  allowSuggestions: PropTypes.bool,
  getSearchSuggestions: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired,
  headingText: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  searchTerm: PropTypes.string.isRequired,
}

SearchBy.defaultProps = {
  allowSuggestions: true,
}
