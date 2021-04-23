import React from "react"

import { Link } from "react-router-dom"

const PetTypeTile = (props) => {
  const { type, imgUrl, description } = props.type
  const typeTitle = type.charAt(0).toUpperCase() + type.slice(1)
  return (
    <div className="cell small-8">
      <Link to={`/pets/${type}`}>
        <h4 className="pets">{typeTitle}</h4>
        <div className="tile-border">
          <img src={`${imgUrl}`} alt="Pet picture" />
          <p className="text">{description}</p>

        </div>
      </Link>
    </div>
  )
}

export default PetTypeTile