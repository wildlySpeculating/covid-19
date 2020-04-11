import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Tabs from './Tabs/Tabs'

export default function TabSelector(props) {
  const { activeTabId, className, onChange, tabList } = props

  return (
    <Tabs
      activeTabId={activeTabId}
      className={cn('o-grid  o-grid--justify-center', className)}
      onChange={onChange}
    >
      {tabList.map(({ id, content }) => (
        <Tabs.Tab
          className="o-grid__item  u-text-center  u-no-wrap  u-1/3  u-1/5@desktop"
          id={id}
          key={id}
        >
          {content}
        </Tabs.Tab>
      ))}
    </Tabs>
  )
}

TabSelector.propTypes = {
  activeTabId: PropTypes.string.isRequired,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  tabList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
    })
  ).isRequired,
}

TabSelector.defaultProps = {
  className: '',
}
