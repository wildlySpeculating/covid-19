import React from 'react'
import './App.css'

import CovidDataContextProvider from './Context/CovidDataContextProvider'
import SearchByCounty from './Components/SearchByCounty'
import SearchByState from './Components/SearchByState'
import SearchByZipCode from './Components/SearchByZipCode'
import TrendingCounties from './Components/TrendingCounties'
import TrendingStates from './Components/TrendingStates'

function App() {
  return (
    <div className="App  u-margin-sides-large">
      <header>
        <h1 className="c-app-title">United States COVID-19 Thingy</h1>
      </header>
      <CovidDataContextProvider>
        <div>
          <TrendingStates className="u-margin-bot" />
          <TrendingCounties className="u-margin-bot" />
          <SearchByZipCode className="u-margin-bot" />
          <SearchByCounty className="u-margin-bot" />
          <SearchByState className="u-margin-bot" />
        </div>
      </CovidDataContextProvider>
    </div>
  )
}

export default App
