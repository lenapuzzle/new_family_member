import React, { useState, useEffect } from "react"
import { Link, Redirect } from "react-router-dom"

import PetTile from './PetTile'

const PetIndex = (props) => {
  const [pets, setPets] = useState([])
  const [notFound, setNotFound] = useState(false)

  const type = props.match.params.type

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch(`/api/v1/pets/${type}`)
        if (!response.ok) {
          if (response.status == 404) {          
            setNotFound(true)
            return null
          } else {
            const errorMessage = `${response.status} (${response.statusText})`
            const error = new Error(errorMessage)
            throw (error)
          }
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
    pet.type = type
    return (
      <PetTile
        key={pet.id}
        pet={pet}
      />
    )
  })

  if (notFound) {
    return <Redirect to="/404" />
  }

  return (
    <div>
      <h1>Check Out Our Adorable {type}</h1>
      {petTiles}
    </div>
  )
}

export default PetIndex