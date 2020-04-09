import React from 'react'
import PropTypes from 'prop-types'

import useCovidData from '../Hooks/useCovidData'
import Trending from './Trending'

export default function TrendingStates(props) {
  const { className } = props

  const { getTrendingStates } = useCovidData()

  const trending = getTrendingStates()

  return (
    <Trending
      className={className}
      sortedData={trending}
      title={'Trending States'}
      trendCount={10}
    />
  )
}

TrendingStates.propTypes = {
  className: PropTypes.string,
}

TrendingStates.defaultProps = {
  className: '',
}
