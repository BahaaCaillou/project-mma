import User from "../models/UserModel.js";
import Article from "../models/ArticleModel.js";
import Equipement from "../models/EquipementModel.js";

export const addFavoriteArticle = async (req, res) => {
  const { userId, articleId } = req.params;

  const user = await User.findById(userId);
  const article = await Article.findById(articleId);

  if (!user || !article) {
    return res.status(404).json({ message: 'User or Article not found' });
  }

  if (!user.favorites.includes(articleId)) {
    user.favorites.push(articleId);
    await user.save();
  }

  res.json(user);
};

export const removeFavoriteArticle = async (req, res) => {
  const { userId, articleId } = req.params;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  user.favorites = user.favorites.filter(id => id.toString() !== articleId);
  await user.save();

  res.json(user);
};

export const addFavoriteEquipement = async (req, res) => {
  const { userId, equipementId } = req.params;

  const user = await User.findById(userId);
  const equipement = await Equipement.findById(equipementId);

  if (!user || !equipement) {
    return res.status(404).json({ message: 'User or Equipement not found' });
  }

  if (!user.favoriteEquipements.includes(equipementId)) {
    user.favoriteEquipements.push(equipementId);
    await user.save();
  }

  res.json(user);
};

export const removeFavoriteEquipement = async (req, res) => {
  const { userId, equipementId } = req.params;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  user.favoriteEquipements = user.favoriteEquipements.filter(id => id.toString() !== equipementId);
  await user.save();

  res.json(user);
};