import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

import ResultsDisplay from './ResultsDisplay'
import useCovidData from '../Hooks/useCovidData'
import StateCountyList from './StateCountyList'

export default function StateResults(props) {
  const { fips } = props

  const { getStateDataByFips } = useCovidData()

  const { covidData, displayName } = useMemo(() => getStateDataByFips(fips), [
    getStateDataByFips,
    fips,
  ])

  const barChartData = useMemo(() => {
    return (
      covidData &&
      covidData.map(({ date, cases, deaths }) => ({
        date,
        cases,
        deaths,
      }))
    )
  }, [covidData])

  return (
    <ResultsDisplay className="u-margin-bot" data={barChartData} displayName={displayName}>
      <StateCountyList fips={fips} />
    </ResultsDisplay>
  )
}

StateResults.propTypes = {
  fips: PropTypes.string.isRequired,
}
