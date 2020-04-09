import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Button from '../Button/Button'

export default function SearchSuggestion(props) {
  const { children, className, ...butttonProps } = props

  return (
    <li className={cn('c-search__suggestion  o-grid', className)}>
      <Button
        className="c-button-inline  o-grid__item  u-1/1  u-text-left u-padding-sides-tiny"
        {...butttonProps}
      >
        {children}
      </Button>
    </li>
  )
}

SearchSuggestion.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
}

SearchSuggestion.defaultProps = {
  className: '',
}
