import React from 'react'
import './App.css'

import CovidDataContextProvider from './Context/CovidDataContextProvider'
import Routes from './Routes'

function App() {
  return (
    <div className="app">
      <CovidDataContextProvider>
        <Routes />
      </CovidDataContextProvider>
    </div>
  )
}

export default App
