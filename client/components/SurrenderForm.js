import React, { useState, useEffect } from 'react'

const SurrenderForm = props => {
  const [successfulSubmit, setSuccessfulSubmit] = useState(false)
  const [petTypes, setPetTypes] = useState([])
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    petName: "",
    petAge: "",
    petType: "",
    imgURL: "",
    vaccinationStatus: ""
  })

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

  const postNewPet = async (formPayload) => {
    try {
      const response = await fetch("/api/v1/pets/new", {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(formPayload)
      })
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw (error)
      }
      setSuccessfulSubmit(true)
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  const petTypeOptions = petTypes.map(petType => {
    const typeName = petType.type.charAt(0).toUpperCase() + petType.type.slice(1,-1)
    return (
      <option key={petType.type} value={petType.id}>
        {typeName}
      </option>
    )
  })

  const vaxStatuses = {
    '': '',
    'Vaccinated': true,
    'Not Vaccinated': false
  }

  const vaxStatusOptions = Object.keys(vaxStatuses).map(status => {
    return (
      <option key={vaxStatuses[status]} value={vaxStatuses[status]}>
        {status}
      </option>
    )
  })

  const handleInputChange = event => {
    setFormData({
      ...formData,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const onSubmitHandler = event => {
    event.preventDefault()
    // validation here
    postNewPet(formData)
  }

  const clearForm = event => {
    event.preventDefault()
    useState({
      name: "",
      phoneNumber: "",
      email: "",
      petName: "",
      petAge: "",
      petType: "",
      imgURL: "",
      vaccinationStatus: ""
    })
  }

  let successMessage = ""
  if (successfulSubmit) {
    successMessage = "Your surrender request is in process! Thank you!!!"
  }

  return (
    <>
    <h1>Surrender Your Pet Form</h1>
    <h3>Don't be sad, it's for the best :'(</h3>
      <form onSubmit={onSubmitHandler}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" onChange={handleInputChange} value={formData.name} />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input type="text" id="phoneNumber" name="phoneNumber" onChange={handleInputChange} value={formData.phoneNumber} />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="text" id="email" name="email" onChange={handleInputChange} value={formData.email} />
        </div>
        <div>
          <label htmlFor="petName">Pet Name:</label>
          <input type="text" id="petName" name="petName" onChange={handleInputChange} value={formData.petName} />
        </div>
        <div>
          <label htmlFor="petAge">Pet Age:</label>
          <input type="text" id="petAge" name="petAge" onChange={handleInputChange} value={formData.petAge} />
          {/* <input type="number" id="petAge" name="petAge" min="0" max="100" value={formData.petAge}></input> */}
        </div>
        <div>
          <label>
            Pet Type:
              <select name="petType" onChange={handleInputChange} value={formData.petType}>{petTypeOptions}</select>
          </label>
        </div>
        <div>
          <label>
            Vaccination Status (You can't be too careful these days!):
              <select name="vaccinationStatus" onChange={handleInputChange} value={formData.vaccinationStatus}>{vaxStatusOptions}</select>
          </label>
        </div>
        <div>
          <label htmlFor="imgURL">Pet Image URL:</label>
          <input type="text" id="imgURL" name="imgURL" onChange={handleInputChange} value={formData.imgURL} />
        </div>
        <div>
          <button className="button" onClick={clearForm}>Clear</button>
          <input className="button" type="submit" value="Submit" />
        </div>
      </form>
      <p>{successMessage}</p>
    </>
  )
}

export default SurrenderForm