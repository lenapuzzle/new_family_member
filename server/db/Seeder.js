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

       const catData = await pool.query("SELECT * FROM pet_types WHERE type = 'cats';")
       const cat = catData.rows[0]
       const dogData = await pool.query("SELECT * FROM pet_types WHERE type = 'dogs';")
       const dog = dogData.rows[0]

       const pets = [
         {
          name: "Captain Jack",
          img_url: "https://images-na.ssl-images-amazon.com/images/I/51yL023V6kL._AC_.jpg",
          age: 2,
          vaccination_status: false,
          adoption_story: "Likes - Staring out the window; Dislikes - The warlock's curse that transformed him into a cat",
          available_for_adoption: true,
          petType: cat
         },
         {
          name: "ChocO",
          img_url: "https://i.pinimg.com/originals/b4/76/ab/b476ab5f38c84ca0cf04a9d23a711a40.jpg",
          age: 5,
          vaccination_status: false,
          adoption_story: "Likes - Stealing a pizza; Dislikes - Being woken up from long naps",
          available_for_adoption: true,
          petType: cat
         },
         {
          name: "Bimbo",
          img_url: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F28%2F2019%2F08%2Fcorgi-dog-name-POPDOGS0819.jpg",
          age: 4,
          vaccination_status: false,
          adoption_story: "Likes - laying down in a sunbeam; Dislikes - To be left alone",
          available_for_adoption: true,
          petType: dog
         },
         {
          name: "Timmy",
          img_url: "https://i.ebayimg.com/images/g/hXoAAOSwQnpgblRI/s-l300.jpg",
          age: 6,
          vaccination_status: false,
          adoption_story: "Likes - NOTHING; Dislikes - EVERYTHING AND EVERYONE; Special message - Please, adopt me!",
          available_for_adoption: true,
          petType: dog
         }
       ]

       for(let i=0; i < pets.length; i++) {
         const pet = pets[i]
         const queryString = `INSERT INTO adoptable_pets (name, img_url, age, vaccination_status, adoption_story, available_for_adoption, pet_type_id) VALUES ($1, $2, $3, $4, $5, $6, $7)`
         await pool.query(queryString, [pet.name, pet.img_url, pet.age, pet.vaccination_status, pet.adoption_story, pet.available_for_adoption, pet.petType.id])
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
