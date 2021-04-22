import React, { useState, useEffect } from "react"

const PetShowPage = props => {

  const [pet, setPet] = useState({})
  const [show, setShow] = useState(false)

  const getPet = async () => {

    const id = props.match.params.id
    const type = props.match.params.type

    try {
      const response = await fetch(`/api/v1/pets/${type}/${id}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw (error)
      }
      const fetchedData = await response.json()
      setPet(fetchedData.pet)

    } catch (error) {
      console.log(`Error in fetch: ${error.message}`)
      throw (error)
    }
    setShow(true)
  }

  useEffect(() => {
    getPet()
  }, [])

  let vaccinated = "No"
  if (pet.vaccinationStatus) {
    vaccinated = "Yes"
  }

  if (show) {
    if (pet.name) {

      return (
        <div>
          <img src={pet.imgUrl} alt='Image' />
          <h2>{pet.name}</h2>
          <h3>Age: {pet.age}</h3>
          <h4>Vaccination Status: {vaccinated}</h4>
          <h4>{pet.adoptionStory}</h4>
        </div>
      )
    } else {
      return (
        <p>No pet found</p>
      )
    }
  } else {
    return <div></div>
  }
}


export default PetShowPage