import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Button from '../Button/Button'

export default function SearchButton(props) {
  const { children, className, ...buttonProps } = props

  return (
    <Button className={cn('c-search__button  u-margin-left-tiny', className)} {...buttonProps}>
      {children}
    </Button>
  )
}

SearchButton.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

SearchButton.defaultProps = {
  className: '',
}
