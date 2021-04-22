import express from "express"

import PetType from '../../../models/PetType.js'
import SurrenderForm from '../../../models/SurrenderForm.js'

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
    const petType = await PetType.findPetType(type)
    const pets = await petType.pets()
    res.status(200).json({ pets: pets })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error })
  }
})
 
petTypesRouter.post("/new", async (req, res) => {
  try {
    debugger
    const newForm = new SurrenderForm(req.body)
    const newPet = new Pet(req.body)
    if (newPet.save() && newForm.save()) {
      res.status(201).json({ pet: newPet })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error })
  }
})

export default petTypesRouter

