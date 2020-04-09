import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

export default function SearchLabel(props) {
  const { children, className, ...labelProps } = props

  return (
    <label className={cn('c-search__label', className)} {...labelProps}>
      {children}
    </label>
  )
}

SearchLabel.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

SearchLabel.defaultProps = {
  className: '',
}
