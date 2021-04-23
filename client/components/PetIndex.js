import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import _ from 'lodash'

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
        setPets(petData.pets)
      } catch (err) {
        console.error(`Error in fetch: ${err.message}`)
      }
    }
    
    fetchPets()
  }, [type])

  const petTiles = pets.map(pet => {
    pet.type = type
    return (
      <PetTile
        key={pet.id}
        pet={pet}
      />
    )
  })

  return (
    <div className="pet-index">
      <h1 className="header-text">Check Out Our Adorable {_.capitalize(type)}</h1>
      {petTiles}
    </div>
  )
}

export default PetIndex