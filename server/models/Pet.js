import pg from "pg"

const pool = new pg.Pool({connectionString: "postgres://postgres:password@localhost:5432/new_family_member_development"})

class Pet {
  constructor ({id,name, img_url, imgUrl, age, vaccination_status, vaccinationStatus,
          adoption_story, adoptionStory, available_for_adoption, 
          availableForAdoption, pet_type_id, petTypeId}){
    this.id = id
    this.name = name
    this.imgUrl = imgUrl || img_url
    this.age = age 
    this.vaccinationStatus = vaccinationStatus || vaccination_status
    this.adoptionStory = adoptionStory || adoption_story
    this.availableForAdoption = availableForAdoption || available_for_adoption
    this.petTypeId = petTypeId || pet_type_id
  }

  async getTypeId
  async save() {
    try {
      const query = "INSERT INTO adoptable_pets (name, age, imgUrl, vaccinationStatus, adoptionStory, availableForAdoption, petTypeId "
    } catch {

    }
  }
   
}

export default Pet

