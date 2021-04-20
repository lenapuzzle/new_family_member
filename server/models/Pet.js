import pg from "pg"

const pool = new pg.Pool({ connectionString: "postgres://postgres:password@localhost:5432/new_family_member_development" })

class Pet {
    constructor({ name, img_url, imgUrl, age, vaccination_status, vaccinationStatus,adoption_story, adoptionStory, available_for_adoption,availableForAdoption, pet_type_id, petTypeId }) {
        this.name = name
        this.imgUrl = imgUrl || img_url
        this.age = age
        this.vaccinationStatus = vaccinationStatus || vaccination_status
        this.adoptionStory = adoptionStory || adoption_story
        this.availableForAdoption = availableForAdoption || available_for_adoption
        this.petTypeId = petTypeId || pet_type_id
    }

    // static async findAll() {
    //     try {
    //       const result = await pool.query("SELECT * FROM adoptable_pets;")
    //       const petsData = result.rows
    //       const pets = petsData.map(pet => new this(pet))

    //       return pets

    //     } catch (error) {
    //         console.log(error)
    //         throw (error)
    //     }
    // }

    // async petType() {
    //     const petTypeFile = await import("./PetType.js")
    //     const PetType = petTypeFile.default

    //     try {
    //       const query = `SELECT * FROM pet_types WHERE type = $1;`
    //       const result = await pool.query(query, [this.petTypeId])

    //       const relatedPetTypeData = result.rows[0]
    //       const relatedPetType = new PetType(relatedPetTypeData)

    //       return relatedPetType

    //     } catch (error) {
    //         console.log(error)
    //         throw (error)
    //     }
    // }

}

export default Pet