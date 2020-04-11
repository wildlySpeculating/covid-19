import React from 'react'
import PropTypes from 'prop-types'

import useCovidData from '../Hooks/useCovidData'
import Trending from './Trending'

const STATES_TO_DISPLAY = 10

export default function TrendingStates(props) {
  const { className } = props

  const { getTrendingStates } = useCovidData()

  return (
    <Trending
      className={className}
      displayCount={STATES_TO_DISPLAY}
      getData={getTrendingStates}
      title={'Trending States'}
    />
  )
}

TrendingStates.propTypes = {
  className: PropTypes.string,
}

TrendingStates.defaultProps = {
  className: '',
}
