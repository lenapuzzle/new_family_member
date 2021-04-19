import express from "express"

const router = new express.Router()

//fill in with our routes
const clientRoutes = ["/", "/pets"]
router.get(clientRoutes, (req, res) => {
  res.render("home")
})

export default router
