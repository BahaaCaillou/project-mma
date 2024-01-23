import Equipement from "../models/EquipementModel.js"

export const GetGuides = async (req, res) => {

    const guides = await Equipement.find({category : "Guides et tutoriels"}).limit(30)
    res.json(guides)
}



