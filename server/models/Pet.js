import pg from "pg"

const pool = new pg.Pool({connectionString: "postgres://postgres:password@localhost:5432/new_family_member_development"})

class Pet {
  constructor ({id, petName, name, age, petAge, img_url, imgUrl, vaccination_status = false, vaccinationStatus = false,
          adoption_story = "N/A", adoptionStory = "N/A", available_for_adoption = true, 
          availableForAdoption = true, pet_type_id, petTypeId}){
    this.id = id
    this.name = petName || name
    this.age = age || petAge
    this.imgUrl = imgUrl || img_url
    this.vaccinationStatus = vaccinationStatus || vaccination_status
    this.adoptionStory = adoptionStory || adoption_story
    this.availableForAdoption = availableForAdoption || available_for_adoption
    this.petTypeId = petTypeId || pet_type_id
  }

  async save() {
    try {
      const query = "INSERT INTO adoptable_pets (name, age, img_url, vaccination_status, adoption_story, available_for_adoption, pet_type_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id;"
      const result = await pool.query(query, [this.name, this.age, this.imgUrl, this.vaccinationStatus, this.adoptionStory, this.availableForAdoption, this.petTypeId])
      this.id = result.rows[0].id
      return this.id
    } catch (error){
      console.log(error)
      throw(error)
    }
  }
   
}

export default Pet

