import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import TabsContext from './TabsContext'
import Button from '../Button/Button'

export default function Tab(props) {
  const { children, className, id } = props

  const { activeTabId, onChange } = useContext(TabsContext)

  const active = id === activeTabId

  return (
    <li className={cn('c-tabs__tab', className, { 'c-tabs__tab--active': active })}>
      <Button
        className={cn('c-button-inline  u-padding-sides-small', {
          'c-tabs__tab-label--active': active,
          'u-padding-bot-tiny': !active,
        })}
        id={id}
        onClick={onChange}
      >
        {children}
      </Button>
    </li>
  )
}

Tab.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
}

Tab.defaultProps = {
  className: '',
}
