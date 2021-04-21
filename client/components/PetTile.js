// leaving off here - PetTile untested and not yet built out
// end of day one (4/19) Ben and Emilia

import React from "react"
import { Link } from "react-router-dom"

const PetTile = (props)=>{
  const {name, age, imgUrl, vaccinationStatus} = props.pet
  let vaccinated = "No"
  if (vaccinationStatus) {
    vaccinated = "Yes"
  }
    
  return(
    <div>
      <h3>{name}</h3>
      <img src={`${imgUrl}`} />
      <p>Age: {age}</p>
      <p>Vaccinated: {vaccinated}</p>
    </div>
  )
}


export default PetTile