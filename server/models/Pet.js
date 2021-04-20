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

}

export default Pet