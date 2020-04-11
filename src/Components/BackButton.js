import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { Link } from 'react-router-dom'

import { STATIC_ROUTES } from '../Routes'

export default function BackButton(props) {
  const { children, className, history } = props

  const isHome = history.location.pathname === STATIC_ROUTES.HOME

  return (
    <div className={cn('', { 'u-invisible': isHome }, className)}>
      <nav className="o-grid  u-padding-left-tiny  u-margin-bot-none">
        <Link className="o-grid__item  o-grid__item--shrink" to={'/'}>
          Home
        </Link>
      </nav>
      {children}
    </div>
  )
}

BackButton.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

BackButton.defaultProps = {
  className: '',
}
