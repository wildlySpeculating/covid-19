import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import ViewTitle from './ViewTitle'
import NYTAttribute from './NYTAttribute'
import TrendingChart from './TrendingChart'

export default function Trending(props) {
  const { className, displayCount, getData, title } = props

  const getTrendingUp = useCallback(
    (duration) => getData(duration).slice(-displayCount).reverse(),
    [displayCount, getData]
  )

  const getFlatteningTheCurve = useCallback(
    (duration) => getData(duration).slice(0, displayCount),
    [displayCount, getData]
  )

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
              getData={getTrendingUp}
              title={'Trending Up*'}
            />
            <TrendingChart
              className="o-grid__item  u-text-left  u-1/1  u-1/2@tablet"
              getData={getFlatteningTheCurve}
              title={'Flattening the Curve'}
            />
            <span className="c-trending-disclaimer  o-grid__item  u-1/1  u-text-right  u-font-size-tiny">
              *Minimum 100 cases
            </span>
          </div>
        </div>
        <NYTAttribute className="o-grid__item  u-1/1  u-text-left" />
      </div>
    </div>
  )
}

Trending.propTypes = {
  className: PropTypes.string,
  displayCount: PropTypes.number.isRequired,
  getData: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
}

Trending.defaultProps = {
  className: '',
}
