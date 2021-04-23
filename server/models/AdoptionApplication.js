import pg from "pg"

const pool = new pg.Pool({ connectionString: "postgres://postgres:password@localhost:5432/new_family_member_development" })

class AdoptionApplication {
  constructor ({
    name,
    email,
    phone_number, 
    phoneNumber,
    homeStatus,
    home_status,
    application_status,
    applicationStatus,
    adoptable_pet_id,
    adoptablePetId,
    id = null
  }) {
    this.id = id
    this.name = name
    this.email = email
    this.homeStatus = homeStatus || home_status
    this.phoneNumber = phoneNumber || phone_number
    this.applicationStatus = applicationStatus || application_status || "pending"
    this.adoptablePetId = adoptablePetId || adoptable_pet_id
  }

  async save() {
    try {
      const query = "INSERT INTO adoption_applications (name, phone_number, email, home_status, application_status, adoptable_pet_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;"
      const result = await pool.query(query, [this.name, this.phoneNumber, this.email, this.homeStatus, this.applicationStatus, this.adoptablePetId])
      console.log('hit DB!',result.rows)
      const id = result.rows[0]
      if (id) {
        return id
      } else {
        return false
      }
    } catch (error) {
      console.log(error)
      throw(error)
    }
  }
}

export default AdoptionApplication