import Equipement from "../models/EquipementModel.js"

export const LastEquipement =  async (req, res) => {

    const lastEquipement = await Equipement.find({}).limit(1).sort({date: -1}) // ça me renvoie un tableau
    res.json(lastEquipement)
}