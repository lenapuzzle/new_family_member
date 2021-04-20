import express from "express"

const router = new express.Router()

const clientRoutes = [] 
// const clientRoutes = ["/pets/:petType"] 

router.get(clientRoutes, (req, res) => {
  res.render("home")
})

export default router