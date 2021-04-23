import React, { useState } from 'react';
import _ from 'lodash'

import ErrorList from './ErrorList'

const AdoptionForm = props => {
  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    homeStatus: ""
  })

  const validForSubmission = () => {
    let submitErrors = {}
    const requiredFields = ["name", "phoneNumber", "email", "homeStatus"]
    requiredFields.forEach((field, index) => {
      if (formData[field].trim() === "") {
        submitErrors = {
          ...submitErrors,
          [_.startCase(field)]: "is blank"
        }
      }
    })
    setErrors(submitErrors)
    return _.isEmpty(submitErrors)
  }

  const homeStatus = ["", "Home Owner", "Renter"]
  const homeStatusOptions = homeStatus.map(option => {
    return <option key={option} value={option}>{option}</option>
  })

  const postAdoptionForm = async (formPayload) => {
    try {
      const response = await fetch("/api/v1/pets/adoption-form", {
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
      props.onSubmitSuccess()
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    if (validForSubmission()) {
      const formPayload = { adoptablePetId: props.petId, ...formData }
      postAdoptionForm(formPayload)
    }
  }

  const handleInputChange = event => {
    setFormData({
      ...formData,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const clearForm = event => {
    setFormData({
      name: "",
      phoneNumber: "",
      email: "",
      homeStatus: ""
    })
  }

  return (
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
        <label htmlFor="email">E-mail:</label>
        <input type="text" id="email" name="email" onChange={handleInputChange} value={formData.email} />
      </div>

      <div>
        <label>
          Home Status:
          <select name="homeStatus" onChange={handleInputChange} value={formData.homeStatus}>{homeStatusOptions}</select>
        </label>
      </div>

      <div>
        <button className="button" onClick={clearForm}>Clear</button>
        <input className="button" type="submit" value="Submit" />
      </div>
    </form>
  )
}

export default AdoptionForm