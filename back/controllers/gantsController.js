import Equipement from "../models/EquipementModel.js"

export const GetGants = async (req, res) => {

    const gants = await Equipement.find({category : "Gants et bandages"}).limit(30)
    res.json(gants)
}



