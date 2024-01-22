import Article from '../models/ArticleModel.js'; // Assurez-vous d'importer votre modèle Article
import mongoose from 'mongoose';

export const upvoteArticle = async (req, res) => {
    try {
        const articleId = req.params.articleId;
        const userId = new mongoose.Types.ObjectId(req.userId);

        let article = await Article.findById(articleId);

        if (article.hasVoted.includes(userId)) {
            // L'utilisateur a déjà voté, annulez le vote
            console.log(article.hasVoted)
            article.votes = article.hasVoted.length - 1
            await Article.updateOne(
                { _id: articleId },
                {
                    $pull: { hasVoted: userId },
                    votes: article.votes
                }
            );
            console.log(article.hasVoted)
        } else {
            // L'utilisateur n'a pas encore voté, ajoutez le vote
            article.votes = article.hasVoted.length + 1;
            await Article.updateOne(
                { _id: articleId },
                { $addToSet: { hasVoted: userId }, votes: article.votes }
            );
            //   return res.json({ message: 'Article upvoted' })
        }

        article = await Article.findById(articleId);

        res.json(article);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const downvoteArticle = async (req, res) => {
    try {
        const articleId = req.params.articleId;
        const userId = new mongoose.Types.ObjectId(req.userId);

        let article = await Article.findById(articleId);

        if (article.hasDownVoted.includes(userId)) {
            // L'utilisateur a déjà downvoté, annulez le downvote

            article.downvotes = article.hasDownVoted.length - 1;
            await Article.updateOne(
                { _id: articleId },
                {
                    $pull: { hasDownVoted: userId },
                    downvotes: article.downvotes
                }
            );
        } else {
            // L'utilisateur n'a pas encore downvoté, ajoutez le downvote
            article.downvotes = article.hasDownVoted.length + 1;
            await Article.updateOne(
                { _id: articleId },
                { $addToSet: { hasDownVoted: userId }, downvotes: article.downvotes }
            );
            //   return res.json({ message: 'Article upvoted' })
        }
        article = await Article.findById(articleId);
        // await article.save();

        res.json(article);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};