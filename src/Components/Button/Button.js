import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

export default function Button(props) {
  const { children, className, href, ...buttonProps } = props

  const Element = href ? 'a' : 'button'

  return (
    <Element className={cn('c-button', className)} {...buttonProps}>
      {children}
    </Element>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  href: PropTypes.string,
}

Button.defaultProps = {
  className: '',
  href: '',
}
