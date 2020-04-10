import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Tabs from './Tabs/Tabs'

export default function TimeFrameSelector(props) {
  const { activeTabId, className, onChange, timeFrames } = props

  return (
    <Tabs
      activeTabId={activeTabId}
      className={cn('o-grid  o-grid--justify-center', className)}
      onChange={onChange}
    >
      {timeFrames.map(({ id, content }) => (
        <Tabs.Tab className="o-grid__item  u-1/5" id={id} key={id}>
          {content}
        </Tabs.Tab>
      ))}
    </Tabs>
  )
}

TimeFrameSelector.propTypes = {
  activeTabId: PropTypes.string.isRequired,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  timeFrames: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
    })
  ).isRequired,
}

TimeFrameSelector.defaultProps = {
  className: '',
}
