import { createContext } from 'react'

export const defaultContext = { countyCovidData: [], stateCovidData: [], fipsData: [] }

const CovidDataContext = createContext(defaultContext)

export default CovidDataContext
