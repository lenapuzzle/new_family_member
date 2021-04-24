import React, { useEffect } from "react"
import { hot } from "react-hot-loader/root"
import "foundation-sites"
import $ from "jquery"
import "../assets/scss/main.scss"

import { Route, BrowserRouter } from "react-router-dom"
import PetShowPage from "./PetShowPage"
import NavBar from "./NavBar"

const App = props => {
  useEffect(() => {
    $(document).foundation()
  }, [])

  return (
    <BrowserRouter>
      <Route path="/" component={NavBar} />
      <Route exact path="/pets/:type/:id" component={PetShowPage} />
    </BrowserRouter>
  )
}

export default hot(App)