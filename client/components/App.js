import React, { useEffect } from "react"
import { hot } from "react-hot-loader/root"
import "foundation-sites"
import $ from "jquery"
import "../assets/scss/main.scss"

import { Route, Switch, BrowserRouter } from "react-router-dom"

import PetTypeIndex from "./PetTypeIndex"

const App = props => {
  useEffect(() => {
    $(document).foundation()
  }, [])

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/pets" component={PetTypeIndex} />
      </Switch>
    </BrowserRouter>
  )
}

export default hot(App)
