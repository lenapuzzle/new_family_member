import React from "react"
import { Link } from "react-router-dom"

const PetTile = (props) => {
  const { id, type, name, age, imgUrl, vaccinationStatus } = props.pet
  
  let vaccinated = "No"
  if (vaccinationStatus) {
    vaccinated = "Yes"
  }

  return (
    <div>
      <Link to={`/pets/${type}/${id}`}>
       <h3>{name}</h3>
        <img src={`${imgUrl}`} alt="Pet to adopt picture"/>
      </Link>
      <p>Age: {age}</p>
      <p>Vaccinated: {vaccinated}</p>
    </div>
  )
}

export default PetTile