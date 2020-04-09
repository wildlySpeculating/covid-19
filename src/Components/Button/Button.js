import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

export default function Button(props) {
  const { children, className, ...buttonProps } = props

  return (
    <button className={cn('c-button', className)} {...buttonProps}>
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

Button.defaultProps = {
  className: '',
}
