import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

import ResultsDisplay from './ResultsDisplay'
import useCovidData from '../Hooks/useCovidData'

export default function CountyResults(props) {
  const { fips } = props

  const { getCountyDataByFips } = useCovidData()

  const { covidData, displayName } = useMemo(() => getCountyDataByFips(fips), [
    getCountyDataByFips,
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

  return <ResultsDisplay data={barChartData} displayName={displayName} />
}

CountyResults.propTypes = {
  fips: PropTypes.string.isRequired,
}
