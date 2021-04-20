import express from "express"

import PetType from '../../../models/PetType.js'

const petTypesRouter = new express.Router()

petTypesRouter.get("/", async (req, res) => {
    try {
        const petTypes = await PetType.findAll()
        res.status(200).json({ petTypes: petTypes })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error })
    }
})

petTypesRouter.get("/:petType", async (req, res) => {

    try {
        const type = req.params.petType
        const pets = await PetType.findByType(type)
        res.status(200).json({ pets: pets })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error })
    }
})

// petTypesRouter.get("/:petType", async (req, res) => {

//     try {
//         const type = PetType.findByType(req.params.petType)
//         type.pets = await type.pets()
//         res.status(200).json({ type: type })

//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ error: error })
//     }
// })

export default petTypesRouter