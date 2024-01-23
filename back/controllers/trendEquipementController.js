import Equipement from '../models/EquipementModel.js';

export const getEquipementWithMostComments = async (req, res) => {
  try {
    let equipements = await Equipement.find();
    equipements = equipements.sort((a,b)=> b.comments.length - a.comments.length)
    if (equipements.length === 0) {
      return res.status(404).json({ message: 'Aucun article trouvé' });
    }
    
    const mostCommentedEquipement = equipements[0];
    console.log(mostCommentedEquipement)
    res.status(200).json(mostCommentedEquipement);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'article le plus commenté' });
  }
};