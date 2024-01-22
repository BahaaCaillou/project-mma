import Article from "../models/ArticleModel.js"

export const LastArticle =  async (req, res) => {

    const lastArticle = await Article.find({}).limit(1).sort({date: -1}) // ça me renvoie un tableau
    res.json(lastArticle)
}