import express from "express"
import { GetAllUsers, LoginSubmit, RegisterSubmit, UpdateUserRole, deleteUser } from "../controllers/userController.js";
import { isAdmin, isLogged } from "../middlewares/auth.js";

const router = express.Router();


// Définir toutes vos routes qui sont liées à un utilisateur

// TOUS LES UTILISATEURS
router.get("/users", isLogged, isAdmin,  GetAllUsers)


// SE CONNECTER
router.post("/login", LoginSubmit)

// S'INSCRIRE
router.post("/register", RegisterSubmit )

router.put('/users/:id/role', isLogged, isAdmin, UpdateUserRole);

router.delete('/users/:id', isLogged, isAdmin, deleteUser);

// router.put('/users/:id/update', isLogged, updateUserEmailAndPassword);



export default router
