import React, {useState, useEffect} from "react"
import { Switch, Route, Link } from "react-router-dom"

import PetTypeIndex from "./PetTypeIndex"
import PetIndex from "./PetIndex"
import SurrenderForm from "./SurrenderForm"

const NavBar = props => {
  const [petTypes, setPetTypes] = useState([])
  useEffect(() => {
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
    fetchPetTypes()
  }, [])

  const petTypeLinks = petTypes.map(petType => {
    let typeName = petType.type.charAt(0).toUpperCase() + petType.type.slice(1)
    return (
      <div>
        <Link to={`/pets/${petType.type}`}>Adorable {typeName}</Link>
      </div>
    )
  })

  return (
    <div className="row column">
      <div className="navbar">
        <Link to="/pets">All Pets</Link>
      </div>
      {/* <div className="navbar">
        <Link to="/pets/cats">Precious Cats</Link>
      </div>
      <div className="navbar">
        <Link to="/pets/dogs">Adorable Dogs</Link>
      </div> */}
      {petTypeLinks}
      <div className="navbar">
        <Link to="/adoptions/new">Sad to say Goodbye</Link>
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