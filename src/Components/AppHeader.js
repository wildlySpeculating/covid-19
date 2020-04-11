import React from 'react'
import PropTypes from 'prop-types'

export default function AppHeader(props) {
  const { children } = props

  return (
    <header className="c-app-header  u-padding-small">
      <h1 className="c-app-title  u-margin-bot-none">United States COVID-19 Thingy</h1>
      {children}
    </header>
  )
}

AppHeader.propTypes = {
  children: PropTypes.node.isRequired,
}
