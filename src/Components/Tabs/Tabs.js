import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Tab from './Tab'
import TabsContextProvider from './TabsContexProvider'

export default function Tabs(props) {
  const { activeTabId, children, className, onChange } = props

  return (
    <ul className={cn('c-tabs  o-list-bare  u-margin-bot-small', className)}>
      <TabsContextProvider activeTabId={activeTabId} onChange={onChange}>
        {children}
      </TabsContextProvider>
    </ul>
  )
}

Tabs.Tab = Tab

Tabs.propTypes = {
  activeTabId: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

Tabs.defaultProps = {
  className: '',
}
