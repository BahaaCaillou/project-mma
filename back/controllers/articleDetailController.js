import Article from "../models/ArticleModel.js"

export const GetDetailArticle = async (req, res) => {
    const {id} = req.params
    const detailArticle = await Article.findById(id)
    res.json(detailArticle)
}