import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

export default function AppBody(props) {
  const { children, className } = props

  return (
    <div className={cn('u-padding-top-small  u-margin-sides-large@tablet', className)}>
      {children}
    </div>
  )
}

AppBody.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

AppBody.defaultProps = {
  className: '',
}
