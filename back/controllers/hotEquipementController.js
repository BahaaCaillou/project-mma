import Equipement from '../models/EquipementModel.js';

export const getEquipementWithMostVotes = async (req, res) => {
  try {
    let equipements = await Equipement.find();
    equipements = equipements.sort((a,b)=> b.votes - a.votes)
    if (equipements.length === 0) {
      return res.status(404).json({ message: 'Aucun article trouvé' });
    }
    
    const mostVotedEquipement = equipements[0];
    console.log(mostVotedEquipement)
    res.status(200).json(mostVotedEquipement);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'article le plus commenté' });
  }
};