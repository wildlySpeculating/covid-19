import React from 'react'
import PropTypes from 'prop-types'

import useCovidData from '../Hooks/useCovidData'
import Trending from './Trending'

export default function TrendingCounties(props) {
  const { className } = props

  const { getTrendingCounties } = useCovidData()

  const trending = getTrendingCounties()

  return (
    <Trending
      className={className}
      sortedData={trending}
      title={'Trending States'}
      trendCount={20}
    />
  )
}

TrendingCounties.propTypes = {
  className: PropTypes.string,
}

TrendingCounties.defaultProps = {
  className: '',
}
