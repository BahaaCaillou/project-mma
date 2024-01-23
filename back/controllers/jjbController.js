import Equipement from "../models/EquipementModel.js"

export const GetJjb = async (req, res) => {

    const jjb = await Equipement.find({category : "JJB et Grappling"}).limit(30)
    res.json(jjb)
}



