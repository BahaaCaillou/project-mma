import Article from "../models/ArticleModel.js";

// Controller pour créer un commentaire
export const addComment = async (req, res) => {
    const { articleId } = req.params;
    const { pseudo, comment } = req.body;

  
    try {
      const article = await Article.findById(articleId);
      article.comments.push({ pseudo, comment, date: new Date() });
      await article.save();
  
      res.status(201).json(article);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Comment addition failed" });
    }
  };
  
  export const getComments = async (req, res) => {
    const { articleId } = req.params;
  
    try {
      const article = await Article.findById(articleId);
      res.status(200).json(article.comments);
    } catch (error) {
      console.error(error);
      res.status(404).json({ message: "Comments not found" });
    }
  };