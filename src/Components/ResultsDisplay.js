import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import BarChart from './BarChart'
import TabSelector from './TabSelector'
import NYTAttribute from './NYTAttribute'

const MAX = 'MAX'
const MONTH = 'MONTH'
const WEEK = 'WEEK'

export default function ResultsDisplay(props) {
  const { children, className, data, displayName } = props

  const [activeTabId, setActiveTabId] = useState(MAX)

  function handleChange(e) {
    setActiveTabId(e.target.id)
  }

  const barChartData = useMemo(() => {
    if (activeTabId === WEEK) {
      return data.slice(-7)
    }
    if (activeTabId === MONTH) {
      return data.slice(-30)
    }
    if (activeTabId === MAX) {
      return data
    }
  }, [activeTabId, data])

  const timeFrames = [
    { id: WEEK, content: '7 days' },
    { id: MONTH, content: '30 days' },
    { id: MAX, content: 'Max' },
  ]

  return (
    data &&
    data.length > 0 && (
      <div className={className}>
        <div className={cn('o-grid  u-border  u-padding-small')}>
          <h5 className="o-grid__item  u-1/1  u-margin-bot-small">{displayName}</h5>
          <div className="o-grid__item  u-1/1">
            <TabSelector activeTabId={activeTabId} onChange={handleChange} tabList={timeFrames} />
          </div>
          <div className="o-grid__item  u-1/1">
            <BarChart data={barChartData}></BarChart>
          </div>
          <div className="o-grid__item  u-1/1">{children}</div>
        </div>
        <NYTAttribute className="u-text-left" />
      </div>
    )
  )
}

ResultsDisplay.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      cases: PropTypes.number.isRequired,
      deaths: PropTypes.number.isRequired,
    })
  ).isRequired,
  displayName: PropTypes.string.isRequired,
}

ResultsDisplay.defaultProps = {
  children: null,
  className: '',
}
