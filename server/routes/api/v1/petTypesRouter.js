import express from "express"

import PetType from '../../../models/PetType.js'
import Pet from '../../../models/Pet.js'

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

petTypesRouter.get("/:type", async (req, res) => {

    try {
        const type = req.params.type
        const pets = await PetType.findByType(type)
        res.status(200).json({ pets: pets })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error })
    }
})

petTypesRouter.get("/:type/:id", async (req, res) => {

    try {
        const type = req.params.type
        const petId = req.params.id

        const pet = await Pet.findById(petId)
        res.status(200).json({pet: pet})

    } catch(error) {
        console.log(error)
        res.status(500).json({error: error})
    }
})

export default petTypesRouter