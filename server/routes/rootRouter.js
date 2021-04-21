import express from "express"
import clientRouter from "./clientRouter.js"
import petTypesRouter from "./api/v1/petTypesRouter.js"

const rootRouter = new express.Router()

rootRouter.use("/api/v1/pets", petTypesRouter)

rootRouter.get("/", (req, res) => {
  return res.redirect("/pets")
})

rootRouter.use("/", clientRouter)

export default rootRouter