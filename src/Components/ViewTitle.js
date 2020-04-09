import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

export default function ViewTitle(props) {
  const { children, className } = props

  return <h4 className={cn('', className)}>{children}</h4>
}

ViewTitle.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

ViewTitle.defaultProps = {
  className: '',
}
