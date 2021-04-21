import React from "react"

import { Link } from "react-router-dom"

const PetTypeTile = (props) => {
  const { type, imgUrl, description } = props.type
  const typeTitle = type.charAt(0).toUpperCase() + type.slice(1)
  return (
    <div>
      <Link to={`/pets/${type}`}>
        <h3>{typeTitle}</h3>
        <p>{description}</p>
        <div>
          <img src={`${imgUrl}`} alt="Pet picture"/>
        </div>
      </Link>
    </div>
  )
}

export default PetTypeTile