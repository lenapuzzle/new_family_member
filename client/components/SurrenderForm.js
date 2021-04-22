import React, { useState, useEffect } from 'react'
import ErrorList from "./ErrorList"
import _ from 'lodash'

const SurrenderForm = props => {
  const [successfulSubmit, setSuccessfulSubmit] = useState(false)
  const [errors, setErrors] = useState({})
  const [petTypes, setPetTypes] = useState([])
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    petName: "",
    petAge: "",
    petTypeId: "",
    imgUrl: "",
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

  const petTypeOptions = petTypes.map(petType => {
    let typeName = petType.type.charAt(0).toUpperCase() + petType.type.slice(1,-1)
    return (
      <option key={petType.id} value={petType.id}>
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

  const postNewPet = async (formPayload) => {
    try {
      const response = await fetch("/api/v1/adoptions/new", {
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

  const validForSubmission = () => {
    let submitErrors = {}
    const requiredFields = ["name", "phoneNumber", "email", "petName", "petAge", "petTypeId", "imgUrl", "vaccinationStatus"]
    const displayedFields = ["Name", "Phone Number", "E-mail", "Pet Name", "Pet Age", "Pet Type", "Image URL", "Vaccination Status"]
    requiredFields.forEach((field, index) => {
      if (formData[field].trim() === "") {
        debugger
        submitErrors = {
          ...submitErrors,
          [displayedFields[index]]: "is blank"
        }
      }
    })
    setErrors(submitErrors)
    return _.isEmpty(submitErrors)
  }

  const handleInputChange = event => {
    setFormData({
      ...formData,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const onSubmitHandler = event => {
    event.preventDefault()
    if(validForSubmission()){
      postNewPet(formData)
      clearForm()
    }
  }

  const clearForm = event => {
    setFormData({
      name: "",
      phoneNumber: "",
      email: "",
      petName: "",
      petAge: "",
      petTypeId: "",
      imgUrl: "",
      vaccinationStatus: ""
    })
    setErrors({})
    successMessage = ""
    setSuccessfulSubmit(false)
  }

  let successMessage = ""
  if (successfulSubmit) {
    successMessage = "Your surrender request is in process! Thank you!!"
  }

  return (
    <>
    <h1>Surrender Your Pet</h1>
    <h3>Don't be sad, it's for the best :'(</h3>
      <form onSubmit={onSubmitHandler}>
        <ErrorList errors={errors} />
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
        </div>
        <div>
          <label>
            Pet Type:
              <select name="petTypeId" onChange={handleInputChange} value={formData.petTypeId}>
                <option value=""></option>
                {petTypeOptions}
              </select>
          </label>
        </div>
        <div>
          <label>
            Vaccination Status:
              <select name="vaccinationStatus" onChange={handleInputChange} value={formData.vaccinationStatus}>{vaxStatusOptions}</select>
          </label>
        </div>
        <div>
          <label htmlFor="imgUrl">Pet Image URL:</label>
          <input type="text" id="imgUrl" name="imgUrl" onChange={handleInputChange} value={formData.imgUrl} />
        </div>
        <div>
          <button className="button" type="button" onClick={clearForm}>Clear</button>
          <input className="button" type="submit" value="Submit" />
        </div>
      </form>
      <p>{successMessage}</p>
    </>
  )
}

export default SurrenderForm