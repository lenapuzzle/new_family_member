import express from "express"

const router = new express.Router()

const clientRoutes = ["/", "/pets", "/pets/:type", "/pets/:type/:id"]

router.get(clientRoutes, (req, res) => {
  res.render("home")
})

export default router