import Article from "../models/ArticleModel.js";

export const getArticleWithMostVotes = async (req, res) => {
    try {
      let articles = await Article.find();
      articles = articles.sort((a,b)=> b.votes - a.votes)
      if (articles.length === 0) {
        return res.status(404).json({ message: 'Aucun article trouvé' });
      }
      
      const mostVotedArticle = articles[0];
      console.log(mostVotedArticle)
      res.status(200).json(mostVotedArticle);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la récupération de l\'article le plus voté' });
    }
  };