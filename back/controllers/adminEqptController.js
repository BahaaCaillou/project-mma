import Equipement from "../models/EquipementModel.js";

export const AddPostSubmitEq = async (req, res) => {
    try {
        
      const { title, description, category, price, affiliateLink } = req.body;

      let image = [{
        src: req.file.filename,
        alt: req.file.originalname
    }]
      const newEquipement = new Equipement({
        title,
        description,
        category,
        price,
        affiliateLink,
        images : image
      });
      await newEquipement.save();
      res.status(201).json(newEquipement);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

export const AdminEq = async (req, res) => {
    try {
        const equipements = await Equipement.find();
        res.status(200).json(equipements);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

export const DeletePostEq = async (req, res) => {
    try {
        const { id } = req.params;
        await Equipement.findByIdAndDelete(id);
        res.status(200).json({ message: 'Article supprimé avec succès.' });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

export const AddPostEq = async (req,res) =>{
    let category = await Equipement.distinct("category")
    console.log(category)
    for (const oneCategory of category) {
       res.json(category)
    }
}

export const EditPostEq = async (req, res) => {
    const { id } = req.params;
    const { title, description, category, imageUrl, price, affiliateLink  } = req.body;
  
    try {
      const updatedEquipement = await Equipement.findByIdAndUpdate(
        id,
        { title, description, category, imageUrl, price, affiliateLink },
        { new: true, useFindAndModify: false } // Ajoutez l'option useFindAndModify: false
      );
  
      if (!updatedEquipement) {
        return res.status(404).json({ message: 'Article not found' });
      }
  
      return res.status(200).json(updatedEquipement);
    } catch (error) {
      console.error('Error updating article:', error);
      return res.status(500).json({ message: 'Failed to update article' });
    }
  };