import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Button from './Button/Button'
import TimeFrameSelector from './TimeFrameSelector'

const FIVE = 'FIVE'
const TEN = 'TEN'
const THREE = 'THREE'

const timeFrames = {
  THREE: { id: THREE, content: '3 day', duration: 3 },
  FIVE: { id: FIVE, content: '5 day', duration: 5 },
  TEN: { id: TEN, content: '10 day', duration: 10 },
}

export default function TrendingTable(props) {
  const { className, getData, title } = props

  const [activeTabId, setActiveTabId] = useState(THREE)

  const trendingData = useMemo(() => {
    return getData(timeFrames[activeTabId].duration)
  }, [activeTabId, getData])

  function handleChange(e) {
    setActiveTabId(e.target.id)
  }

  return (
    <div className={cn('', className)}>
      <h5 className="u-margin-bot-small">{title}</h5>
      <TimeFrameSelector
        activeTabId={activeTabId}
        className="u-margin-bot-small"
        onChange={handleChange}
        timeFrames={Object.values(timeFrames)}
      />
      {/* {'\u2b0c'} */}
      <div className="o-grid">
        {trendingData.map(({ fips, name, low, high, percentIncrease }, i) => (
          <Button
            className="c-button-inline  o-grid__item  u-1/1  u-font-size-small  u-margin-bot-tiny"
            key={fips}
          >
            <div className="o-grid">
              <div className="o-grid__item--shrink  c-trending-chart-rank">{i + 1}</div>
              <div className="o-grid__item  u-text-left  u-margin-left-small">{name}</div>
              {/* <div className="o-grid__item--shrink">{high - low}</div> */}
              <div className="c-trending-chart-percent  o-grid__item--shrink  u-margin-left-small  u-text-right">
                {percentIncrease > 0 && (
                  <span className="c-trending-chart-up-arrow">{'\u2b06'}</span>
                )}
                {percentIncrease}%
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  )
}

TrendingTable.propTypes = {
  className: PropTypes.string,
  getData: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
}

TrendingTable.defaultProps = {
  className: '',
}
