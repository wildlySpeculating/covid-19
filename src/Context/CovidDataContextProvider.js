import React, { useEffect, useMemo, useReducer } from 'react'
import PropTypes from 'prop-types'
import papa from 'papaparse'

import CovidDataContext, { defaultContext } from './CovidDataContext'
import zipCountyFips from '../ZIP-COUNTY-FIPS_2018-03.csv'
import fipsToStateNameMap from '../data/fipsToStateNameMap'

import NY_TIMES_COUNTY_DATA_URL from '../us-counties.csv'
import NY_TIMES_STATE_DATA_URL from '../us-states.csv'
// const NY_TIMES_COUNTY_DATA_URL = '/nytimes/covid-19-data/master/us-counties.csv'
// const NY_TIMES_STATE_DATA_URL = '/nytimes/covid-19-data/master/us-states.csv'

const initialState = defaultContext

function initializeState() {
  return initialState
}

export const ACTION_TYPES = {
  SET_FIPS_TO_COUNTY_NAME_MAP: 'SET_FIPS_TO_COUNTY_NAME_MAP',
  SET_FIPS_TO_STATE_NAME_MAP: 'SET_FIPS_TO_STATE_NAME_MAP',
  SET_RAW_COUNTY_COVID_DATA: 'SET_RAW_COUNTY_COVID_DATA',
  SET_RAW_FIPS_DATA: 'SET_RAW_FIPS_DATA',
  SET_RAW_STATE_COVID_DATA: 'SET_RAW_STATE_COVID_DATA',
  RESET: 'RESET',
}

function CovidDataContextReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.SET_RAW_COUNTY_COVID_DATA:
      return { ...state, countyCovidData: action.payload }
    case ACTION_TYPES.SET_RAW_STATE_COVID_DATA:
      return { ...state, stateCovidData: action.payload }
    case ACTION_TYPES.SET_RAW_FIPS_DATA:
      return { ...state, fipsData: action.payload }
    case ACTION_TYPES.SET_FIPS_TO_COUNTY_NAME_MAP:
      return { ...state, fipsToCountyNameMap: action.payload }
    case ACTION_TYPES.SET_FIPS_TO_STATE_NAME_MAP:
      return { ...state, fipsToStateNameMap: action.payload }
    case ACTION_TYPES.RESET:
      return initializeState(action.payload)
    default:
      throw new Error()
  }
}

export default function CovidDataContextProvider(props) {
  const { children } = props

  const [CovidDataContextState, CovidDataContextDispatch] = useReducer(
    CovidDataContextReducer,
    initialState
  )

  const CovidDataContextValue = useMemo(
    () => ({
      CovidDataContextState,
      CovidDataContextDispatch,
    }),
    [CovidDataContextState, CovidDataContextDispatch]
  )

  // add fipsToStateNameMap to context
  useEffect(() => {
    CovidDataContextDispatch({
      type: ACTION_TYPES.SET_FIPS_TO_STATE_NAME_MAP,
      payload: fipsToStateNameMap,
    })
  }, [])

  // add raw NYT county data to context
  useEffect(() => {
    papa.parse(NY_TIMES_COUNTY_DATA_URL, {
      download: true,
      complete: function (results, file) {
        CovidDataContextDispatch({
          type: ACTION_TYPES.SET_RAW_COUNTY_COVID_DATA,
          payload: results.data,
        })
      },
    })
  }, [])

  // add raw NYT state data to context
  useEffect(() => {
    papa.parse(NY_TIMES_STATE_DATA_URL, {
      download: true,
      complete: function (results, file) {
        CovidDataContextDispatch({
          type: ACTION_TYPES.SET_RAW_STATE_COVID_DATA,
          payload: results.data,
        })
      },
    })
  }, [])

  // add raw NYT fips data and fipsToCountyNameMap to context
  useEffect(() => {
    papa.parse(zipCountyFips, {
      download: true,
      complete: function (results, file) {
        // CovidDataContextDispatch({
        //   type: ACTION_TYPES.SET_RAW_FIPS_DATA,
        //   payload: results.data,
        // })

        const nextFipsToCountyNameMap = results.data.reduce((prev, curr) => {
          if (!prev.hasOwnProperty(curr[1])) {
            prev[curr[1]] = curr[4]
          }
          return prev
        }, {})

        CovidDataContextDispatch({
          type: ACTION_TYPES.SET_FIPS_TO_COUNTY_NAME_MAP,
          payload: nextFipsToCountyNameMap,
        })
      },
    })
  }, [])

  return (
    <CovidDataContext.Provider value={CovidDataContextValue}>{children}</CovidDataContext.Provider>
  )
}

CovidDataContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
