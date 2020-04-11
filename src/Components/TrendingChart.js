import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import TimeFrameSelector from './TimeFrameSelector'

const FIVE = 'FIVE'
const TEN = 'TEN'
const THREE = 'THREE'

const timeFrames = {
  THREE: { id: THREE, content: '3 days', duration: 3 },
  FIVE: { id: FIVE, content: '5 days', duration: 5 },
  TEN: { id: TEN, content: '10 days', duration: 10 },
}

export default function TrendingChart(props) {
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
        onChange={handleChange}
        timeFrames={Object.values(timeFrames)}
      />
      <ol className="u-margin-bot-none">
        {trendingData.map(({ fips, name, low, high, percentIncrease }) => (
          <li className="" key={fips}>
            {name} {`${percentIncrease}%`}
          </li>
        ))}
      </ol>
    </div>
  )
}

TrendingChart.propTypes = {
  className: PropTypes.string,
  getData: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
}

TrendingChart.defaultProps = {
  className: '',
}
