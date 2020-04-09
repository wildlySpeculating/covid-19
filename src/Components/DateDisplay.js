import React from 'react'
import PropTypes from 'prop-types'

export default function DateDisplay(props) {
  const { date } = props

  const dateObject = new Date(
    date
      .split('-')
      .map((x, i) => (i === 2 ? Number(x) + 1 : x))
      .join('-')
  )
  const options = { weekday: 'long', month: 'long', day: 'numeric' }
  const displayedDate = dateObject.toLocaleDateString('en-US', options)

  return <span>{displayedDate}</span>
}

DateDisplay.propTypes = {
  date: PropTypes.string.isRequired,
}
