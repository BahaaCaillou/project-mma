import Equipement from "../models/EquipementModel.js"

export const GetAcc = async (req, res) => {

    const acc = await Equipement.find({category : "Accessoires"}).limit(30)
    res.json(acc)
}



