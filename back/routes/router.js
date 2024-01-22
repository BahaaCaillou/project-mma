import express from "express";
import {LastArticle } from "../controllers/lastArticleController.js";
import { getArticleWithMostComments} from "../controllers/trendArticleController.js";
import { GetArticle } from "../controllers/newsController.js";
import { downvoteArticle, upvoteArticle } from "../controllers/upVoteArticleController.js";
import { GetDetailArticle } from "../controllers/articleDetailController.js";
import { addComment, getComments} from "../controllers/commentsController.js";
import { AddPost, AddPostSubmit, Admin, DeletePost, EditPost } from "../controllers/adminController.js";
import upload from "../middlewares/multer.js";
import { GetEquipements } from "../controllers/equipementsController.js";
import { GetGants } from "../controllers/gantsController.js";
import { GetCasques } from "../controllers/casquesController.js";
import { GetDents } from "../controllers/dentsController.js";
import { GetJjb } from "../controllers/jjbController.js";
import { GetAcc } from "../controllers/accessoiresController.js";
import { GetGuides } from "../controllers/guidesController.js";
import { GetDetailEquipement } from "../controllers/equipementDetailController.js";
import { LastEquipement } from "../controllers/lastEquipementController.js";
import { getEquipementWithMostComments } from "../controllers/trendEquipementController.js";
import { addCommentEq, getCommentsEq } from "../controllers/commentsEqController.js";
import { getEquipementWithMostVotes } from "../controllers/hotEquipementController.js";
import { downvoteEquipement, upvoteEquipement } from "../controllers/upVoteEquipementController.js";
import { AddPostEq, AddPostSubmitEq, AdminEq, DeletePostEq, EditPostEq } from "../controllers/adminEqptController.js";
import { isAdmin, isLogged } from "../middlewares/auth.js";
import { getArticleWithMostVotes } from "../controllers/hotArticleController.js";
import { addFavoriteArticle, addFavoriteEquipement, removeFavoriteArticle, removeFavoriteEquipement } from "../controllers/favoriteController.js";


const router = express.Router();




router.get("/last-article", LastArticle)
router.get("/trend-article", getArticleWithMostComments)
router.get("/news", GetArticle)

router.get('/upvote/:articleId', isLogged, upvoteArticle);
router.get('/downvote/:articleId', isLogged, downvoteArticle);

router.get('/upvote-eq/:articleId', isLogged, upvoteEquipement);
router.get('/downvote-eq/:articleId', isLogged, downvoteEquipement);


router.get("/detail/:id", GetDetailArticle);
router.post('/comments/:articleId', isLogged, addComment);
router.get('/comments/:articleId', getComments );

router.post('/comments-equipements/:articleId', isLogged, addCommentEq);
router.get('/comments-equipements/:articleId', getCommentsEq );

router.get("/add-post", AddPost);
router.get("/add-post-eq", AddPostEq);

router.post("/submit-post", upload.single("image"), AddPostSubmit);
router.post("/submit-post-eq", upload.single("image"), AddPostSubmitEq);

router.get("/admin", isLogged, isAdmin, Admin);
router.get("/admin-eq", isLogged, isAdmin, AdminEq);

router.delete('/delete-post-eq/:id', isLogged, isAdmin, DeletePostEq);
router.delete('/delete-post/:id', isLogged, isAdmin, DeletePost);

router.put('/update-post/:id', isLogged, isAdmin, EditPost);
router.put('/update-post-eq/:id', isLogged, isAdmin, EditPostEq);

router.get('/equipements', GetEquipements);
router.get('/gants-bandages', GetGants);
router.get('/casques', GetCasques);
router.get('/protege-dents', GetDents);
router.get('/jjb', GetJjb);
router.get('/accessoires', GetAcc);
router.get('/guides', GetGuides);
router.get("/product/:id", GetDetailEquipement);
router.get("/last-equipement", LastEquipement)
router.get("/trend-equipement", getEquipementWithMostComments)
router.get("/votes-equipement", getEquipementWithMostVotes)
router.get("/votes-article", getArticleWithMostVotes)



export default router