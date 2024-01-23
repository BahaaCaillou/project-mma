import Equipement from "../models/EquipementModel.js"

export const GetCasques = async (req, res) => {

    const casques = await Equipement.find({category : "Casques et protections"}).limit(30)
    res.json(casques)
}



