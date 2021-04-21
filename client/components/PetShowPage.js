import React, {useState, useEffect} from "react"

const PetShowPage = props => {

  const [pet, setPet] = useState({})

  const  getPet = async () => {
    
    const id = props.match.params.id
    const type = props.match.params.type

    try {
     debugger
     const response = await fetch(`/api/v1/pets/${type}/${id}`)
     if(!response.ok) {
      
       const errorMessage = `${response.status} (${response.statusText})`
       const error = new Error(errorMessage)
       throw(error)
     }
     const fetchedData = await response.json()
     setPet(fetchedData.pet)

    } catch(error) {
      console.log(`Error in fetch: ${error.message}`)
      throw(error)
    }
  }

  useEffect(() => {
    getPet
  }, [])
    
  debugger
  return (
    <div>
      <img src={`${pet.imgUrl}`}/>
      <h2>{pet.name}</h2>
      <h3>{pet.age}</h3>
      <h4>{pet.vaccinationStatus}</h4>
      <h4>{pet.adoptionStory}</h4>
    </div>
  )
}


export default PetShowPage