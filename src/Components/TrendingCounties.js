import React from 'react'
import PropTypes from 'prop-types'

import useCovidData from '../Hooks/useCovidData'
import Trending from './Trending'

const COUNTIES_TO_DISPLAY = 20

export default function TrendingCounties(props) {
  const { className } = props

  const { getTrendingCounties } = useCovidData()

  return (
    <Trending
      className={className}
      displayCount={COUNTIES_TO_DISPLAY}
      getData={getTrendingCounties}
      title={'Trending Counties'}
    />
  )
}

TrendingCounties.propTypes = {
  className: PropTypes.string,
}

TrendingCounties.defaultProps = {
  className: '',
}
