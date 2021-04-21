import pg from "pg"

const pool = new pg.Pool({ connectionString: "postgres://postgres:password@localhost:5432/new_family_member_development" })

class PetType {
    constructor({ id, type, img_url, imgUrl, description }) {
        this.id = id
        this.type = type
        this.imgUrl = imgUrl || img_url
        this.description = description
    }
    static async findAll() {
        try {
            const result = await pool.query("SELECT * FROM pet_types;")
            const typesData = result.rows
            const types = typesData.map(type => new this(type))

            return types

        } catch (error) {
            console.log(error)
            throw (error)
        }
    }

    static async findPetsByType(type) {
        const petFile = await import('./Pet.js')
        const Pet = petFile.default

        try {
            const query = "SELECT * FROM adoptable_pets JOIN pet_types ON pet_type_id = pet_types.id WHERE type = $1;"
            const result = await pool.query(query, [type])
            
            const petsData = result.rows
            
            const pets = petsData.map(pet => new Pet(pet))
            
            return pets
        } catch (error) {
            console.log(error)
            throw (error)
        }
    }
}

export default PetType