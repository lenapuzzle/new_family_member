import React, { useState, useEffect } from "react"

const homeStatus = ["", "Home Owner", "Renter"]

const AdoptionForm = props => {
    const [formData, setFormData] = useState({
        name: "",
        phoneNumber: "",
        email: "",
        homeStatus: ""
    })

    const homeStatusOptions = homeStatus.map(option => {
        return (
            <option key={option} value={option}>{option}</option>
        )
    })

    const onSubmitHandler = event => {
        event.preventDefault()
        props.onAdoptionFormSubmitted(formData)
    }

    const handleInputChange = event => {
        setFormData({
          ...formData,
          [event.currentTarget.id]: event.currentTarget.value
        })
    }

    return (
        <form onSubmit={onSubmitHandler}>

            <div>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" onChange={handleInputChange} value={formData.name}/>
            </div>
            
            <div>
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input type="text" id="phoneNumber" name="phoneNumber" onChange={handleInputChange} value={formData.phoneNumber}/>
            </div>

            <div>
                <label htmlFor="email">E-mail:</label>
                <input type="text" id="email" name="email" onChange={handleInputChange} value={formData.email}/>
            </div>

            <div>
                <label>
                    Home Status:
                    <select name="homeStatus" onChange={handleInputChange} value={formData.homeStatus}>{homeStatusOptions}</select>
                </label>
            </div>

            <div>
                <button className="button">Clear</button>
                <input className="button" type="submit" value="Submit" />
            </div>
            
        </form>
    )



}

