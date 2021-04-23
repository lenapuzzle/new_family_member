import React, { useEffect } from "react"
import { hot } from "react-hot-loader/root"
import "foundation-sites"
import $ from "jquery"
import "../assets/scss/main.scss"
import { Route, BrowserRouter } from "react-router-dom"

import NavBar from "./NavBar"

const App = props => {
  useEffect(() => {
    $(document).foundation()
  }, [])

  return (
    <div className="grid-container">
      <div className="cell small-12">
        <BrowserRouter>
          <Route path="/" component={NavBar} />
        </BrowserRouter>
      </div>
    </div>
  )
}

export default hot(App)