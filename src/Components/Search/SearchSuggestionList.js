import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

export default function SearchSuggestionList(props) {
  const { children, className } = props

  return <ul className={cn('c-search__suggestion-list  o-list-bare', className)}>{children}</ul>
}

SearchSuggestionList.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

SearchSuggestionList.defaultProps = {
  className: '',
}
