import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Search from './Search'
import SignUp from './Signup'
import Waiting from './Waiting'
import Stats from './Stats'
import Settings from './Settings'

export const routes = () => {
  return (
    <Router>
      <div>
        <Route exact path="/search/:pseudo" component={Search} />
        <Route exact path="/" component={SignUp} />
        <Route exact path="/waiting" component={Waiting} />
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/stats/:pseudo" component={Stats} />
      </div>
    </Router>
  )
}
