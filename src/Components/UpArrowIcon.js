import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

export default function UpArrowIcon(props) {
  const { className } = props

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      fill="green"
      viewBox="0 0 512 512"
    >
      <path
        d="M445.771,238.813L264.438,4.146c-2.019-2.612-5.223-4.143-8.428-4.146c-3.211-0.003-6.424,1.529-8.447,4.146
			L66.229,238.813c-2.49,3.219-2.927,7.573-1.135,11.219c1.792,3.656,5.5,5.969,9.573,5.969h96v245.333
			c0,5.896,4.771,10.667,10.667,10.667h149.333c5.896,0,10.667-4.771,10.667-10.667V256h96c4.073,0,7.781-2.313,9.573-5.969
			C448.698,246.385,448.26,242.031,445.771,238.813z"
      />
    </svg>
  )
}

UpArrowIcon.propTypes = {
  className: PropTypes.string,
}

UpArrowIcon.defaultProps = {
  className: '',
}
