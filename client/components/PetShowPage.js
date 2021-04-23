import React, { useState, useEffect } from "react"

import AdoptionForm from "./AdoptionForm.js"

const PetShowPage = props => {
  const [pet, setPet] = useState({})
  const [show, setShow] = useState(true)
  const [displayForm, setDisplayForm] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const getPet = async () => {
    const id = props.match.params.id
    const type = props.match.params.type

    try {
      const response = await fetch(`/api/v1/pets/${type}/${id}`)
      if (!response.ok) {
        if (response.status == 404) {
          setShow(false)
          return
        } else {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw (error)
        }
      }
      const fetchedData = await response.json()
      setPet(fetchedData.pet)
    } catch (error) {
      console.log(`Error in fetch: ${error.message}`)
      throw (error)
    }
  }

  useEffect(() => {
    getPet()
  }, [])

  let vaccinated = "No"
 
  if (pet.vaccinationStatus) {
    vaccinated = "Yes"
  }

  const showForm = event => {
    setDisplayForm(true)
  }

  const onSubmitSuccess = event => {
    setDisplayForm(false)
    setShowSuccessMessage(true)
  }

  if (pet.name) {
    return (
      <div className="show-page">
        <img src={pet.imgUrl} alt='Image' />
        <h2>{pet.name}</h2>
        <h3>Age: {pet.age}</h3>
        <h4>Vaccination Status: {vaccinated}</h4>
        <h4>{pet.adoptionStory}</h4>

        <button className="button" onClick={showForm}>Adopt Me!</button>
        {showSuccessMessage ? <h4>Thank you! Your adoption request is in the works!</h4> : null}
        {displayForm ? <AdoptionForm petId={pet.id} onSubmitSuccess={onSubmitSuccess} /> : null}
      </div>
    )
  } else {
    return (
      <p>No pet found</p>
    )
  }
}

export default PetShowPage