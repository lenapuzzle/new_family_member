import pg from "pg"

const pool = new pg.Pool({
  connectionString: "postgres://postgres:password@localhost:5432/new_family_member_development" })

class Seeder {
  static async seed() {
    // your seeder code here
     try {
       const petTypes = [
         {
           type: "cats",
           img_url: "https://filmdaily.co/wp-content/uploads/2020/04/cute-cat-videos-lede-1300x882.jpg",
           description: "You don't own them, they own you instead"
         },
         {
           type: "dogs",
           img_url: "http://cdn.akc.org/content/article-body-image/cavkingcharlessmalldogs.jpg",
           description: "You truly own them and they serve you the best they can"
         }
       ]

       for (let i = 0; i < petTypes.length; i++) {
         const petType = petTypes[i]
         const queryString = "INSERT INTO pet_types (type, img_url, description) VALUES ($1, $2, $3);"
         await pool.query(queryString, [petType.type, petType.img_url, petType.description])
       }

       console.log("Seeding is complete")
       pool.end()

     } catch (error) {
       console.log(error)
       pool.end()
     }
  }
}

export default Seeder
