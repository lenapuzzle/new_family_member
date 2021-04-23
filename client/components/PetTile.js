import React from "react"
import { Link } from "react-router-dom"

const PetTile = (props) => {
  const { id, type, name, age, imgUrl, vaccinationStatus } = props.pet
  
  let vaccinated = "No"
  if (vaccinationStatus) {
    vaccinated = "Yes"
  }

  return (
    <div className="text">
      <Link to={`/pets/${type}/${id}`}>
        <h3 className="pets">{name}</h3>
        <div className="tile-border">  
          <div className="pet-info">
            <p>Age: {age}</p>
            <p>Vaccinated: {vaccinated}</p>
          </div>
          <img src={`${imgUrl}`} alt="Pet to adopt picture" />
        </div>
      </Link>
    
    </div>
  )
}

export default PetTile