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

  async pets() {
    const petFile = await import('./Pet.js')
    const Pet = petFile.default
    try {
      const query = "SELECT * FROM adoptable_pets WHERE pet_type_id = $1;"
      const result = await pool.query(query, [this.id]) 
      const petsData = result.rows
      const pets = petsData.map(pet => new Pet(pet))
      return pets
    } catch (error) {
      console.log(error)
      throw (error)
    }
  }

  static async findPetType(type) {
    try{
      const query = "SELECT * FROM pet_types WHERE type = $1"
      const result = await pool.query(query, [type])
      const petTypeData = result.rows[0]
      const petType = new this(petTypeData)
      return petType
    }catch(error){
      console.log(error)
      throw (error)
    }
  }
  
}

export default PetType