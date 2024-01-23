import Equipement from "../models/EquipementModel.js"

export const GetDetailEquipement = async (req, res) => {
    const {id} = req.params
    const detailEquipement = await Equipement.findById(id)
    res.json(detailEquipement)
}