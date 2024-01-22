import Article from "../models/ArticleModel.js";

export const AddPostSubmit = async (req, res) => {
    try {
        
      const { title, description, category} = req.body;

      let image = [{
        src: req.file.filename,
        alt: req.file.originalname
    }]
      const newArticle = new Article({
        title,
        description,
        category,
        images : image
      });
      await newArticle.save();
      res.status(201).json(newArticle);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

export const Admin = async (req, res) => {
    try {
        const articles = await Article.find();
        res.status(200).json(articles);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

export const DeletePost = async (req, res) => {
    try {
        const { id } = req.params;
        await Article.findByIdAndDelete(id);
        res.status(200).json({ message: 'Article supprimé avec succès.' });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

export const AddPost = async (req,res) =>{
    let category = await Article.distinct("category")
    console.log(category)
    for (const oneCategory of category) {
       res.json(category)
    }
}

export const EditPost = async (req, res) => {
    const { id } = req.params;
    const { title, description, category, imageUrl } = req.body;
  
    try {
      const updatedArticle = await Article.findByIdAndUpdate(
        id,
        { title, description, category, imageUrl },
        { new: true, useFindAndModify: false } // Ajoutez l'option useFindAndModify: false
      );
  
      if (!updatedArticle) {
        return res.status(404).json({ message: 'Article not found' });
      }
  
      return res.status(200).json(updatedArticle);
    } catch (error) {
      console.error('Error updating article:', error);
      return res.status(500).json({ message: 'Failed to update article' });
    }
  };