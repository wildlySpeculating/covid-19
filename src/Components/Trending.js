import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import ViewTitle from './ViewTitle'

export default function Trending(props) {
  const { className, sortedData, title, trendCount } = props

  const trendingUp = sortedData.slice(-trendCount).reverse()
  const flatteningTheCurve = sortedData.slice(0, trendCount)

  return (
    <div className={cn('c-trending', className)}>
      <div className="o-grid">
        <div className="o-grid__item  u-1/1">
          <ViewTitle>{title}</ViewTitle>
        </div>
        <div className="o-grid__item  u-1/1">
          <div className="o-grid  o-grid--justify-center  o-grid--gutters  u-padding  u-border">
            <div className="o-grid__item  u-text-left">
              <h5 className="u-margin-bot-small">Trending Up</h5>
              <ol className="">
                {trendingUp.map(({ fips, name, low, high, percentIncrease }) => (
                  <li className="" key={fips}>
                    {name} {`${percentIncrease}%`}
                  </li>
                ))}
              </ol>
            </div>
            <div className="o-grid__item  u-text-left">
              <h5 className="u-margin-bot-small">Flattening the Curve</h5>
              <ol className="">
                {flatteningTheCurve.map(({ fips, name, low, high, percentIncrease }) => (
                  <li className="" key={fips}>
                    {name} {`${percentIncrease}%`}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Trending.propTypes = {
  className: PropTypes.string,
  sortedData: PropTypes.arrayOf(
    PropTypes.shape({
      fips: PropTypes.string.isRequired,
      high: PropTypes.number.isRequired,
      low: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      percentIncrease: PropTypes.number.isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
  trendCount: PropTypes.number.isRequired,
}

Trending.defaultProps = {
  className: '',
}
