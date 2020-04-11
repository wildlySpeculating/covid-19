import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { Link } from 'react-router-dom'

import useCovidData from '../Hooks/useCovidData'

export default function StateCountyList(props) {
  const { className, fips } = props

  const { getCountiesByStateFips, getStateNameByFips } = useCovidData()

  const countyList = useMemo(() => getCountiesByStateFips(fips), [fips, getCountiesByStateFips])
  const displayName = useMemo(() => getStateNameByFips(fips), [fips, getStateNameByFips])

  return (
    countyList &&
    countyList.length > 0 && (
      <div className={cn('o-grid  u-border-top  u-padding-top', className)}>
        <div className="o-grid__item  u-1/1  u-text-center  u-margin-bot-tiny">
          {displayName.full.toUpperCase()} COUNTIES
        </div>
        <table className="o-grid__item  u-1/1">
          <thead>
            <tr>
              <td className="u-text-left">County</td>
              <td className="u-text-right">Cases</td>
              <td className="u-text-right">Deaths</td>
            </tr>
          </thead>
          <tbody>
            {countyList.map(({ countyName, cases, deaths, href }) => (
              <tr>
                <td className="u-text-left">
                  <Link to={href}>{countyName}</Link>
                </td>
                <td className="u-text-right">{cases}</td>
                <td className="u-text-right">{deaths}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  )
}

StateCountyList.propTypes = {
  className: PropTypes.string,
  fips: PropTypes.string.isRequired,
}

StateCountyList.defaultProps = {
  className: '',
}
