import React from "react"

import { Link } from "react-router-dom"

const PetTypeTile = (props) => {
    const {type, img_url, description} = props.type
    return (
        <div>
            <Link to={`/pets/${type}`}>
             <h3> {type} </h3>
             <p>{description}</p>
             <div> 
                <img src={img_url} /> 
             </div>
            </Link>
        </div>
    )
}

export default PetTypeTile