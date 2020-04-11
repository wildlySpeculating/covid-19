import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

import TabsContext from './TabsContext'

export default function TabsContextProvider(props) {
  const { children, activeTabId, onChange } = props

  const tabsContextValue = useMemo(() => ({ activeTabId, onChange }), [activeTabId, onChange])

  return <TabsContext.Provider value={tabsContextValue}>{children}</TabsContext.Provider>
}

TabsContextProvider.propTypes = {
  activeTabId: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}
