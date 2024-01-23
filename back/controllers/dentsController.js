import Equipement from "../models/EquipementModel.js"

export const GetDents = async (req, res) => {

    const dents = await Equipement.find({category : "Protège-dents"}).limit(30)
    res.json(dents)
}



