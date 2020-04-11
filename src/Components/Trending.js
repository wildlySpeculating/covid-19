import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import ViewTitle from './ViewTitle'
import NYTAttribute from './NYTAttribute'
import TrendingChart from './TrendingChart'

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
          <div className="o-grid  o-grid--justify-center  u-padding  u-border">
            <TrendingChart
              className="o-grid__item  u-text-left  u-1/1  u-1/2@tablet  u-margin-bot  u-margin-bot-none@tablet"
              dataArray={trendingUp}
              title={'Trending up'}
            />
            <TrendingChart
              className="o-grid__item  u-text-left  u-1/1  u-1/2@tablet"
              dataArray={flatteningTheCurve}
              title={'Flattening the Curve'}
            />
          </div>
        </div>
        <NYTAttribute className="o-grid__item  u-1/1  u-text-right" />
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
