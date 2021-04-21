import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import PetTile from './PetTile'

const PetIndex = (props) => {
  const [pets, setPets] = useState([])

  const type = props.match.params.type

  useEffect(() => {
    const fetchPets = async () => {

      try {
        const response = await fetch(`/api/v1/pets/${type}`)
        if (!response.ok) {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw (error)
        }
        const petData = await response.json()
        // if the team does not nest the data we can remove the .petTypes reference
        setPets(petData.pets)
      } catch (err) {
        console.error(`Error in fetch: ${err.message}`)
      }
    }
    fetchPets()
  }, [])

  const petTiles = pets.map(pet => {
    return (
      <PetTile
        key={pet.id}
        pet={pet}
      />
    )
  })

  return (
    <div>
      <h1>Check Out Our Adorable {type}</h1>
      {petTiles}
    </div>
  )
}

export default PetIndex