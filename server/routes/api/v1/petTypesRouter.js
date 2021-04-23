import express from "express"

import AdoptionApplication from '../../../models/AdoptionApplication.js'
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
    const petType = await PetType.findPetType(type)
    if (petType){
      const pets = await petType.pets()
      res.status(200).json({ pets: pets })
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error })
  }
})

petTypesRouter.get("/:type/:id", async (req, res) => {
  try {
    const pet = await Pet.findPetById(req.params.id)
    if (pet) {
      pet.type = await pet.type()
    }
    if (pet.type){
      if (pet.type.type === req.params.type) {
        res.status(200).json({ pet: pet })
      }
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error })
  }
})

petTypesRouter.post("/adoption-form", async (req, res) => {
  try {
    const newAdoptionForm = new AdoptionApplication(req.body)
    if (await newAdoptionForm.save()) {
      res.status(201).json({ newAdoptionForm })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error })
  }
})

export default petTypesRouter

