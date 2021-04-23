import express from "express"

const router = new express.Router()

const clientRoutes = ["/", "/404", "/pets", "/pets/:type", "/pets/:type/:id", "/adoptions/new"]

router.get(clientRoutes, (req, res) => {
  res.render("home")
})

export default router