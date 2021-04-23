import React, { useState, useEffect } from "react"
import { Redirect } from 'react-router-dom'

import AdoptionForm from "./AdoptionForm.js"

const PetShowPage = props => {
  const [pet, setPet] = useState({})
  const [notFound, setNotFound] = useState(false)
  const [displayForm, setDisplayForm] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const getPet = async () => {
    const id = props.match.params.id
    const type = props.match.params.type

    try {
      const response = await fetch(`/api/v1/pets/${type}/${id}`)
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

  if (notFound) {
    return <Redirect to="/404" />
  }

  if (pet.name) {
    return (
      <>
        <div className="tile-border cell small-12">
          <h2>{pet.name}</h2>
          <div className="cell small-6">
            <img src={pet.imgUrl} alt='pet image' />
          </div>
          <h3>Age: {pet.age}</h3>
          <h4>Vaccination Status: {vaccinated}</h4>
          <h4>{pet.adoptionStory}</h4>
          <button className="button" onClick={showForm}>Adopt Me!</button>
          <div className="cell">
            {showSuccessMessage ? <h5>Thank you! Your adoption request is in the works!</h5> : null}
            {displayForm ? <AdoptionForm petId={pet.id} onSubmitSuccess={onSubmitSuccess} /> : null}
          </div>
        </div>
      </>
    )
  } else {
    return <></>
  }
}

export default PetShowPage