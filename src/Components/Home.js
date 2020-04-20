import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { Link } from 'react-router-dom'

import { STATIC_ROUTES } from '../Routes'

export default function Home(props) {
  const { className } = props

  const onClick = () => {
    async function getStateData() {
      const data = await fetch('/.netlify/functions/getNYTStateData').then((res) => res.json())

      console.log('data', data)
      return data
    }

    const ans = getStateData()

    console.log('ans', ans)
  }

  return (
    <div className={cn('', className)}>
      <nav>
        <button onClick={onClick}> hello</button>
        <ul className="o-list-bare">
          <li className="u-margin-bot-tiny">
            <Link to={STATIC_ROUTES.SEARCH}>Seach</Link>
          </li>
          <li className="u-margin-bot-tiny">
            <Link to={STATIC_ROUTES.STATE_TRENDS}>State Trends</Link>
          </li>
          <li className="u-margin-bot-tiny">
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
