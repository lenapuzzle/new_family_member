import pg from "pg"

const pool = new pg.Pool({ connectionString: "postgres://postgres:password@localhost:5432/new_family_member_development" })

class SurrenderForm {
  constructor({}) {

  }

  async save() {
    const petFile = await import('./Pet.js')
    const Pet = petFile.default
    try {
      //const newPet
    } catch (error) {
      console.log(error)
      throw(error)
    } 
  }
}

export default SurrenderForm