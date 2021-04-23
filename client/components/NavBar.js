import React from "react"
import { Switch, Route, Link } from "react-router-dom"

import PetTypeIndex from "./PetTypeIndex"
import PetIndex from "./PetIndex"
import SurrenderForm from "./SurrenderForm"

const NavBar = props => {
  return (
    <div className="row column">
      <div className="navbar">
        <Link to="/pets">All Pets</Link>
      </div>
      <div className="navbar">
        <Link to="/pets/cats">Precious Cats</Link>
      </div>
      <div className="navbar">
        <Link to="/pets/dogs">Adorable Dogs</Link>
      </div>
      <div className="navbar">
        <Link to="/adoptions/new">Adopt Me</Link>
      </div>
      <Switch>
        <Route exact path="/pets" component={PetTypeIndex} />
        <Route exact path="/pets/:type" component={PetIndex} />
        <Route exact path="/adoptions/new" component={SurrenderForm} />
      </Switch>
    </div>
  )
}

export default NavBar