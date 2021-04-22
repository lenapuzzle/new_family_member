import express from "express"
import clientRouter from "./clientRouter.js"
import petTypesRouter from "./api/v1/petTypesRouter.js"
import adoptionsRouter from "./api/v1/adoptionsRouter.js"

const rootRouter = new express.Router()

rootRouter.use("/api/v1/pets", petTypesRouter)

rootRouter.use("/api/v1/surrender-applications", adoptionsRouter)

rootRouter.get("/", (req, res) => {
  return res.redirect("/pets")
})

rootRouter.use("/", clientRouter)

export default rootRouter