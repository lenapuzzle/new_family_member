import pg from "pg"

const pool = new pg.Pool({ connectionString: "postgres://postgres:password@localhost:5432/new_family_member_development" })

class SurrenderForm {
  constructor({ id, name, phoneNumber, email, adoptablePetId, application_status, applicationStatus }) {
    this.id = id
    this.name = name
    this.phoneNumber = phoneNumber
    this.email = email
    this.adoptablePetId = adoptablePetId
    this.applicationStatus = applicationStatus || application_status || "pending"
  }

  async save() {
    try {
      const query = "INSERT INTO surrender_applications (name, phone_number, email, adoptable_pet_id, application_status) VALUES ($1, $2, $3, $4, $5) RETURNING id;"
      const result = await pool.query(query, [this.name, this.phoneNumber, this.email, this.adoptablePetId, this.applicationStatus])
      this.id = result.rows[0].id
      return true
    } catch (error) {
      console.log(error)
      throw (error)
    }
  }
}

export default SurrenderForm