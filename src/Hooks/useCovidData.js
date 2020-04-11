import { useContext, useMemo, useCallback } from 'react'
import get from 'lodash.get'

import CovidDataContext from '../Context/CovidDataContext'
import { DYNAMIC_ROUTES } from '../Routes'

export default function useCovidData() {
  const {
    CovidDataContextState: {
      countyCovidData,
      fipsData,
      fipsToCountyNameMap,
      fipsToStateNameMap,
      stateCovidData,
    },
  } = useContext(CovidDataContext)

  const sortedCountyNameList = useMemo(() => {
    return fipsToCountyNameMap
      ? Object.entries(fipsToCountyNameMap).sort(([_, nameA], [__, nameB]) => {
          if (nameA < nameB) {
            return -1
          }
          if (nameA > nameB) {
            return 1
          }
          return 0
        })
      : []
  }, [fipsToCountyNameMap])

  const getCountyDataByFips = useCallback(
    (fips) => {
      const NYC_FIPS = new Set(['36061', '36047', '36081', '36005', '36085'])
      const NEW_YORK_CITY = 'New York City'
      const isNYC = NYC_FIPS.has(fips)

      const covidData = countyCovidData.filter((item) =>
        isNYC ? item[1] === NEW_YORK_CITY : item[3] === fips
      )
      const countyName = isNYC ? NEW_YORK_CITY : fipsToCountyNameMap[fips]
      const state = fipsToStateNameMap[fips.slice(0, 2)]

      return {
        id: fips,
        covidData,
        displayName: `${countyName}, ${state.full}`,
      }
    },
    [countyCovidData, fipsToCountyNameMap, fipsToStateNameMap]
  )

  const getCountySearchSuggestionsByCountyName = useCallback(
    (searchTerm) => {
      return createSearchSuggestions({
        arrayToSearch: sortedCountyNameList,
        displayTextFn: (item) =>
          `${item[1]}, ${get(fipsToStateNameMap, [item[0].slice(0, 2), 'full'], '')}`,
        idxToSearch: 1,
        searchTerm,
        valueFn: ([fips]) => fips,
      })
    },
    [fipsToStateNameMap, sortedCountyNameList]
  )

  const getCountySearchSuggestionsByZip = useCallback(
    (searchTerm) => {
      // TODO SORT BY ZIP FIRST
      return createSearchSuggestions({
        arrayToSearch: fipsData,
        displayTextFn: (item) => `${item[2]}, ${item[3]} ${item[0]} ${item[4]}`,
        idxToSearch: 0,
        searchTerm,
        valueFn: ([zipCode, fips]) => ({ fips, zipCode }),
      })
    },
    [fipsData]
  )

  const getStateDataByFips = useCallback(
    (fips) => {
      const covidData = stateCovidData.filter((item) => item[2] === fips)
      const displayName = get(fipsToStateNameMap, [fips, 'full'], '')

      return { id: fips, covidData, displayName }
    },
    [stateCovidData, fipsToStateNameMap]
  )

  const getCountiesByStateFips = useCallback(
    (fips) => {
      const sliceIndex = findSliceIndex(countyCovidData, 1)

      const latestCountyData = countyCovidData
        .slice(sliceIndex)
        .filter((item) => item[3].startsWith(fips))
        .map(([_, countyName, __, fips, cases, deaths]) => {
          const href = DYNAMIC_ROUTES.COUNTY_RESULTS(fips)
          return { countyName, cases, deaths, href }
        })

      return latestCountyData
    },
    [countyCovidData]
  )

  const getStateSearchSuggestions = useCallback(
    (searchTerm) => {
      const stateArray = Object.entries(fipsToStateNameMap).map(([fips, { full }]) => [fips, full])

      return createSearchSuggestions({
        arrayToSearch: stateArray,
        displayTextFn: ([_, name]) => `${name}`,
        idxToSearch: 1,
        searchTerm,
        valueFn: ([fips, name]) => ({ fips, name }),
      })
    },
    [fipsToStateNameMap]
  )

  const getTrendingCounties = useCallback(
    (daysInTimeFrame) => {
      const fipsToHightLowMap = createFipsHightToLowMap({
        casesIdx: 4,
        dataArray: countyCovidData,
        daysInTimeFrame,
        fipsIdx: 3,
      })

      // calculate and sort by percent change and add in names
      const sortedByTrendArray = Object.entries(fipsToHightLowMap)
        .filter(([fips, { high }]) => fips && high > 100)
        .map(([fips, { high, low }]) => {
          const name = `${get(fipsToCountyNameMap, [fips], fips)}, ${get(
            fipsToStateNameMap,
            [fips.slice(0, 2), 'abrv'],
            ''
          )}`

          const href = DYNAMIC_ROUTES.COUNTY_RESULTS(fips)
          const percentIncrease = calculatePercentIncrease(low, high)

          return { fips, name, low, high, percentIncrease, href }
        })
        .sort((a, b) => a.percentIncrease - b.percentIncrease)

      return sortedByTrendArray
    },
    [countyCovidData, fipsToCountyNameMap, fipsToStateNameMap]
  )

  const getTrendingStates = useCallback(
    (daysInTimeFrame) => {
      const fipsToHightLowMap = createFipsHightToLowMap({
        casesIdx: 3,
        dataArray: stateCovidData,
        daysInTimeFrame,
        fipsIdx: 2,
      })

      // calculate and sort by percent change and add in names
      const sortedByTrendArray = Object.entries(fipsToHightLowMap)
        .filter(([fips, { high }]) => fips && high > 100)
        .map(([fips, { high, low }]) => {
          const href = DYNAMIC_ROUTES.STATE_RESULTS(fips)
          const name = get(fipsToStateNameMap, [fips, 'full'], '')
          const percentIncrease = calculatePercentIncrease(low, high)

          return { fips, name, low, high, percentIncrease, href }
        })
        .sort((a, b) => a.percentIncrease - b.percentIncrease)

      return sortedByTrendArray
    },
    [fipsToStateNameMap, stateCovidData]
  )

  const getStateNameByFips = useCallback((fips) => fipsToStateNameMap[fips], [fipsToStateNameMap])

  return {
    getCountyDataByFips,
    getCountySearchSuggestionsByCountyName,
    getCountiesByStateFips,
    getCountySearchSuggestionsByZip,
    getStateDataByFips,
    getStateNameByFips,
    getStateSearchSuggestions,
    getTrendingCounties,
    getTrendingStates,
  }
}

function createSearchSuggestions({
  arrayToSearch,
  displayTextFn,
  idxToSearch,
  searchTerm,
  valueFn,
}) {
  const suggestions = []
  const normalizedSearchTerm = searchTerm.toLowerCase()

  for (let i = 0; i < arrayToSearch.length; i++) {
    const el = arrayToSearch[i]

    if (el[idxToSearch].toLowerCase().startsWith(normalizedSearchTerm)) {
      suggestions.push({ displayText: displayTextFn(el), value: valueFn(el) })
      if (suggestions.length === 5) {
        break
      }
    }
  }

  return suggestions
}

function findSliceIndex(dataList, daysInTimeFrame) {
  const dateSet = new Set()

  for (let i = dataList.length - 1; i >= 0; i--) {
    const itemDate = dataList[i][0]
    if (!dateSet.has(itemDate)) {
      if (dateSet.size === daysInTimeFrame) {
        return i + 1
      }
      dateSet.add(itemDate)
    }
  }

  return 0
}

function createFipsHightToLowMap({ dataArray, daysInTimeFrame, casesIdx, fipsIdx }) {
  // find the slice index so we know what info we care about
  const sliceIndex = findSliceIndex(dataArray, daysInTimeFrame)

  // slice dataset
  const releventData = dataArray.slice(sliceIndex)

  // iterate through dataset to find low and high for each fips
  const fipsToHightLowMap = releventData.reduce((prev, curr) => {
    const fips = curr[fipsIdx]
    const cases = curr[casesIdx]

    if (!prev.hasOwnProperty(fips)) {
      prev[fips] = { high: Number(cases), low: Number(cases) }
    } else {
      prev[fips].high = Math.max(prev[fips].high, cases)
    }
    return prev
  }, {})

  return fipsToHightLowMap
}

function calculatePercentIncrease(low, high) {
  return ((high / low - 1) * 100).toFixed(2)
}
