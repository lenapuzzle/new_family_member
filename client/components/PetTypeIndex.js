import React, {useState, useEffect} from "react"
import { Link } from "react-router-dom"

import PetTypeTile from './PetTypeTile'

const PetTypeIndex = (props) => {
  const [petTypes, setPetTypes] = useState([])

  useEffect(() => {
    const fetchPetTypes = async () => {
      try {
        const response = await fetch("/api/v1/pets")
        if (!response.ok) {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw(error)
        }
        const petTypeData = await response.json()
        setPetTypes(petTypeData.petTypes)
      } catch(err) {
        console.error(`Error in fetch: ${err.message}`)                
      }
    }
    fetchPetTypes()
  }, [])

  const petTypeTiles = petTypes.map(petType => {
    return (
      <PetTypeTile
        key={petType.id}
        type={petType}
      />
    )
  })

  return (
    <div className="pet-type-index">
      <h1 className="header-text"> Welcome to our Pet Adoption Page</h1>
      {petTypeTiles}
    </div>
  )
}

export default PetTypeIndex