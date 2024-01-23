import Equipement from "../models/EquipementModel.js"

export const GetEquipements = async (req, res) => {

    const equipements = await Equipement.find({}).limit(30).sort({date: -1}) 
    res.json(equipements)
}