import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import AppBody from './Components/AppBody'
import AppHeader from './Components/AppHeader'
import BackButton from './Components/BackButton'
import CountyResults from './Components/CountyResults'
import Home from './Components/Home'
import SearchView from './Components/SearchView'
import StateResults from './Components/StateResults'
import TrendingCounties from './Components/TrendingCounties'
import TrendingStates from './Components/TrendingStates'

export const STATIC_ROUTES = {
  COUNTY_TRENDS: '/countyTrends',
  HOME: '/',
  SEARCH: '/search',
  STATE_TRENDS: '/stateTrends',
}

export const DYNAMIC_ROUTES = {
  COUNTY_RESULTS: (fips) => `/county/${fips}`,
  STATE_RESULTS: (fips) => `/state/${fips}`,
}

export default function App() {
  return (
    <Router>
      <div>
        <AppHeader>
          <Route
            render={({ history }) => {
              return <BackButton history={history} />
            }}
          ></Route>
        </AppHeader>
        <AppBody>
          <Switch>
            <Route path={STATIC_ROUTES.STATE_TRENDS}>
              <TrendingStates />
            </Route>
            <Route path={STATIC_ROUTES.COUNTY_TRENDS}>
              <TrendingCounties />
            </Route>
            <Route path={STATIC_ROUTES.SEARCH}>
              <SearchView />
            </Route>
            <Route
              path={DYNAMIC_ROUTES.STATE_RESULTS(':fips')}
              render={({
                history,
                match: {
                  params: { fips },
                },
              }) => <StateResults fips={fips} />}
            ></Route>
            <Route
              path={DYNAMIC_ROUTES.COUNTY_RESULTS(':fips')}
              render={({
                match: {
                  params: { fips },
                },
              }) => <CountyResults fips={fips} />}
            ></Route>
            <Route path={STATIC_ROUTES.HOME}>
              <Home />
            </Route>
          </Switch>
        </AppBody>
      </div>
    </Router>
  )
}

function About() {
  return <h2>About</h2>
}
