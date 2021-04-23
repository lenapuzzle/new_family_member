import React, {useState, useEffect} from "react"
import { Switch, Route, Link } from "react-router-dom"

import PetTypeIndex from "./PetTypeIndex"
import PetIndex from "./PetIndex"
import SurrenderForm from "./SurrenderForm"
import PetShowPage from "./PetShowPage"
import FourOhFour from "./FourOhFour"

const NavBar = props => {
  const [petTypes, setPetTypes] = useState([])

  const typeName = props.match.params.type
   
    const fetchPetTypes = async () => {
      try {
        const response = await fetch("/api/v1/pets")
        if (!response.ok) {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw (error)
        }
        const petTypeData = await response.json()
        setPetTypes(petTypeData.petTypes)
      } catch (err) {
        console.error(`Error in fetch: ${err.message}`)
      }
    }

    useEffect(() => {
    fetchPetTypes()
    },[typeName])
    
    const petTypeLinks = petTypes.map(petType => {
      let typeName = petType.type[0].toUpperCase() + petType.type.slice(1)
      return <><Link to={`/pets/${petType.type}`} key={petType.id}> Adorable {typeName}</Link> |</>
  })

  return (
    <div className="row column">
      <div className="navbar">
      </div>
      <nav>
        <Link to="/pets">Home</Link> |
        {petTypeLinks}
        <Link to="/adoptions/new">List a pet for adoption</Link>   
      </nav>
      <div className="navbar">
      </div>
      <Switch>
        <Route exact path="/pets" component={PetTypeIndex} />
        <Route exact path="/pets/:type" component={PetIndex} />
        <Route exact path="/pets/:type/:id" component={PetShowPage} />
        <Route exact path="/adoptions/new" component={SurrenderForm} />
        <Route exact path="/404" component={FourOhFour} />
      </Switch>
    </div>
  )
}

export default NavBar