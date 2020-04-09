import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Tabs from './Tabs/Tabs'

export default function TimeFrameSelector(props) {
  const { activeTabId, className, name, onChange, timeFrames } = props

  console.log('name', name)

  return (
    <Tabs
      activeTabId={activeTabId}
      className={cn('o-grid  o-grid--justify-center', className)}
      name={name}
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
  name: PropTypes.string.isRequired,
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
