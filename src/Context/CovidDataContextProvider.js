import React, { useEffect, useMemo, useReducer } from 'react'
import PropTypes from 'prop-types'
import papa from 'papaparse'

import CovidDataContext, { defaultContext } from './CovidDataContext'
import zipCountyFips from '../ZIP-COUNTY-FIPS_2018-03.csv'
import fipsToStateNameMap from '../data/fipsToStateNameMap'

import { fetchCountyData, fetchStateData } from '../api'

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
    fetchCountyData().then((data) => {
      // console.log('countyData', data)
      CovidDataContextDispatch({
        type: ACTION_TYPES.SET_RAW_COUNTY_COVID_DATA,
        payload: data,
      })
    })
  }, [])

  // add raw NYT state data to context
  useEffect(() => {
    fetchStateData().then((data) => {
      CovidDataContextDispatch({
        type: ACTION_TYPES.SET_RAW_STATE_COVID_DATA,
        payload: data,
      })
    })
  }, [])

  // add raw NYT fips data and fipsToCountyNameMap to context
  useEffect(() => {
    papa.parse(zipCountyFips, {
      download: true,
      complete: function (results, file) {
        const slicedData = results.data.slice(1)
        CovidDataContextDispatch({
          type: ACTION_TYPES.SET_RAW_FIPS_DATA,
          payload: slicedData,
        })

        const nextFipsToCountyNameMap = slicedData.reduce((prev, curr) => {
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
