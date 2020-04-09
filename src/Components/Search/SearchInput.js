import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

export default function SearchInput(props) {
  const { children, className, handleSubmit, id, name, ...inputProps } = props

  useEffect(() => {
    function onKeyUp({ key }) {
      if ('Enter' === key) {
        handleSubmit()
      }
    }

    document.addEventListener('keyup', onKeyUp, false)

    return () => {
      document.removeEventListener('keyup', onKeyUp, false)
    }
  }, [handleSubmit])

  return (
    <input
      autocomplete="off"
      className={cn('c-search__input  u-padding-sides-tiny', className)}
      id={id}
      name={name || id}
      type="search"
      {...inputProps}
    />
  )
}

SearchInput.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
}

SearchInput.defaultProps = {
  className: '',
}
