import pg from "pg"

const pool = new pg.Pool({ connectionString: "postgres://postgres:password@localhost:5432/new_family_member_development" })

class Pet {
  constructor ({ id, name, age, img_url, imgUrl, vaccinationStatus, vaccination_status, adoptionStory, adoption_story, available_for_adoption,
  availableForAdoption, pet_type_id, petTypeId }) {
    this.id = id
    this.name = name
    this.age = age
    this.imgUrl = imgUrl || img_url
    this.vaccinationStatus = vaccinationStatus || vaccination_status
    this.adoptionStory = adoptionStory || adoption_story || "N/A" 
    this.availableForAdoption = availableForAdoption || available_for_adoption 
    this.petTypeId = petTypeId || pet_type_id
  }

  async save() {
    try {
      const query = "INSERT INTO adoptable_pets (name, age, img_url, vaccination_status, adoption_story, pet_type_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;"
      const result = await pool.query(query, [this.name, this.age, this.imgUrl, this.vaccinationStatus, this.adoptionStory, this.petTypeId])
      this.id = result.rows[0].id
      return this.id
    } catch (error) {
      console.log(error)
      throw (error)
    }
  }

  static async findPetById(id) {
    try {
      const query = "SELECT * FROM adoptable_pets WHERE id = $1;"
      const result = await pool.query(query, [id])
      if (result.rowCount) {
        const petData = result.rows[0]
        const pet = new this(petData)
        return pet
      } else {
        return false
      }
    } catch (error) {
      console.log(error)
      throw (error)
    }
  }

  async type() {
    const typeFile = await import("./PetType.js")
    const PetType = typeFile.default
    try {
      const query = "SELECT * FROM pet_types WHERE id = $1;"
      const result = await pool.query(query, [this.petTypeId])
      if (result.rows) {
        const relatedTypeData = result.rows[0]
        const relatedPetData = new PetType(relatedTypeData)
        return relatedPetData
      } else {
        return false
      }

    } catch (error) {
      console.log(error)
      throw (error)
    }
  }

}

export default Pet

