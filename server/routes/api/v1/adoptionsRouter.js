import express from "express"
import SurrenderForm from "../../../models/SurrenderForm.js"
import Pet from "../../../models/Pet.js"

const adoptionsRouter = new express.Router()

adoptionsRouter.post("/new", async (req, res) => {
  try {
    const newPet = new Pet(req.body)
    const newForm = new SurrenderForm(req.body)
    const petId = await newPet.save()
    newForm.adoptablePetId = petId
    const formSaved = await newForm.save()
    if (petId && formSaved) {
      res.status(201).json({ pet: newPet })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error })
  }
})

export default adoptionsRouter