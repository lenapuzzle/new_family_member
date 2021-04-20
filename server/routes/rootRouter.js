import express from "express"
import clientRouter from "./clientRouter.js"
import petTypesRouter from "./api/v1/petTypesRouter"

const rootRouter = new express.Router()

rootRouter.use("/api/v1/pets", petTypesRouter)

rootRouter.use("/", clientRouter)

export default rootRouter
