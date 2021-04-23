import React, { useEffect } from "react"
import { hot } from "react-hot-loader/root"
import "foundation-sites"
import $ from "jquery"
import "../assets/scss/main.scss"

import { Route, Switch, BrowserRouter } from "react-router-dom"

import PetTypeIndex from "./PetTypeIndex"
import PetIndex from "./PetIndex"
import SurrenderForm from "./SurrenderForm"
import PetShowPage from "./PetShowPage"
import FourOhFour from "./FourOhFour"

const App = props => {
  useEffect(() => {
    $(document).foundation()
  }, [])

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/pets" component={PetTypeIndex} />
        <Route exact path="/pets/:type" component={PetIndex} />
        <Route exact path="/adoptions/new" component={SurrenderForm} />
        <Route exact path="/pets/:type/:id" component={PetShowPage} />
        <Route exact path="/404" component={FourOhFour} />
      </Switch>
    </BrowserRouter>
  )
}

export default hot(App)