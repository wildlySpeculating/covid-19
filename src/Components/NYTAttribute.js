import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

export default function NYTAttribute(props) {
  const { className } = props

  return (
    <div className={cn('u-font-size-tiny', className)}>
      Data from <a href="https://github.com/nytimes/covid-19-data">The New York Times</a>
    </div>
  )
}

NYTAttribute.propTypes = {
  className: PropTypes.string,
}

NYTAttribute.defaultProps = {
  className: '',
}
