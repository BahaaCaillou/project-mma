import Article from "../models/ArticleModel.js"

export const GetArticle = async (req, res) => {

    const articles = await Article.find({}).limit(30).sort({date: -1}) 
    res.json(articles)
}