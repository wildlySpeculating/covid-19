import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { Link } from 'react-router-dom'

import { STATIC_ROUTES } from '../Routes'

export default function Home(props) {
  const { className } = props

  return (
    <div className={cn('', className)}>
      <nav>
        <ul className="o-list-bare">
          <li>
            <Link to={STATIC_ROUTES.SEARCH}>Seach</Link>
          </li>
          <li>
            <Link to={STATIC_ROUTES.STATE_TRENDS}>State Trends</Link>
          </li>
          <li>
            <Link to={STATIC_ROUTES.COUNTY_TRENDS}>County Trends</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

Home.propTypes = {
  className: PropTypes.string,
}

Home.defaultProps = {
  className: '',
}
