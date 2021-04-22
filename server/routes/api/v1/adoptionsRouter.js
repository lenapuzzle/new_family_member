import express from "express"
import SurrenderForm from "../../../models/SurrenderForm.js"
import Pet from "../../../models/Pet.js"

const adoptionsRouter = new express.Router()

adoptionsRouter.post("/", async (req, res) => {
  try {
    const newPet = new Pet({
      name: req.body.petName,
      age: req.body.petAge,
      imgUrl: req.body.imgUrl,
      vaccinationStatus: req.body.vaccinationStatus,
      petTypeId: req.body.petTypeId
    })
    const newForm = new SurrenderForm({
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email
    })
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