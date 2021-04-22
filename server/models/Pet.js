import pg from "pg"

const pool = new pg.Pool({ connectionString: "postgres://postgres:password@localhost:5432/new_family_member_development" })

class Pet {
    constructor({ id, name, img_url, imgUrl, age, vaccination_status, vaccinationStatus,
        adoption_story, adoptionStory, available_for_adoption,
        availableForAdoption, pet_type_id, petTypeId }) {
        this.id = id
        this.name = name
        this.imgUrl = imgUrl || img_url
        this.age = age
        this.vaccinationStatus = vaccinationStatus || vaccination_status
        this.adoptionStory = adoptionStory || adoption_story
        this.availableForAdoption = availableForAdoption || available_for_adoption
        this.petTypeId = petTypeId || pet_type_id
    }

    static async findPetById(id) {
        try {
            const query = "SELECT * FROM adoptable_pets WHERE id = $1;"
            const result = await pool.query(query, [id])
            const petData = result.rows[0]
            const pet = new this(petData)
            return pet
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

