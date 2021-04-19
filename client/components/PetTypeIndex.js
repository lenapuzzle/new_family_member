import React, {useState, useEffect} from "react"
import { Link } from "react-router-dom"

import PetTypeTile from './PetTypeTile'

const PetTypeIndex = (props) => {
    const[petTypes, setPetTypes] = useState([])

    useEffect(() => {
        const fetchPetTypes = async () => {
            try {
                const response = await fetch("/api/v1/pets")
                if (!response.ok) {
                    const errorMessage = `${response.status} (${response.statusText})`
                    const error = new Error(errorMessage)
                    throw(error)
                }
                const petTypeData = await response.json()
                // if the team does not nest the data we can remove the .petTypes reference
                setPetTypes(petTypeData.petTypes)
            } catch(err) {
                console.error(`Error in fetch: ${err.message}`)                
            }
        }
      //  fetchPetTypes()
      setPetTypes([{id:1, type: "whales", img_url:"www.pizza.com", description: "optional string"}, {id:2, type: "dogs", img_url:"www.pizza.com", description: "optional string"}])
    }, [])

    const petTypeTiles = petTypes.map(petType => {
        return(
            <PetTypeTile
                key={petType.id}
                type={petType}
            />
          )
    })
    
    return(
        <div>
            <h1> Welcome to our Pet Adoption Page</h1>
            {petTypeTiles}
        </div>
    )
}

export default PetTypeIndex