import React from "react"
import { Link } from "react-router-dom"
import { Route, Switch, Redirect } from "react-router-dom"

import PetTypeIndex from "./PetTypeIndex"
import PetIndex from "./PetIndex"
import PetShowPage from "./PetShowPage"
import SurrenderForm from "./SurrenderForm"

const NavBar = (props) => {

  return (
    <div>
      <nav>
        <Link to="/pets">Home page</Link> |
        <Link to="/pets/dogs">Our Adorable Dogs</Link> |
        <Link to="/pets/cats">Our Adorable Cats</Link> |
        <Link to="/adoptions/new">List a pet for adoption</Link>   
      </nav>
      <div>
        <Switch>
          <Route exact path="/">
            <Redirect to="/pets" />
          </Route>
          <Route exact path="/pets" component={PetTypeIndex} />
          <Route exact path="/pets/:type" component={PetIndex} />
          <Route exact path="/pets/:type/:id" component={PetShowPage} />
          <Route exact path="/adoptions/new" component={SurrenderForm} />
        </Switch>
      </div>
    </div>
  )
}

export default NavBar