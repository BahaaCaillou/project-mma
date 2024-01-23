import User from "../models/UserModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"




export const RegisterSubmit = async (req, res) => {

    const checkPwd = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$/
    // On va vérifier que le mail de l'utilisateur n'existe pas en BDD
    let verifMail  = await User.findOne({"email": req.body.email})

    if(verifMail){
        return res.json({message: "Cet email est déjà enregistré"})
    }
    if(!checkPwd.test(req.body.password)) {
        return res.json({message: "Le mot de passe ne respecte pas les conditions"})
    }
    let user = {
        login: req.body.login,
        email: req.body.email,
        password: req.body.password
        
    }

    let newUser = new User(user)

    // NOTRE HOOK PRE, va s'exécuter
    await newUser.save()

    res.json({message: "Utilisateur bien enregistré"})

}


export const LoginSubmit = async (req, res) =>{
    const user = await User.findOne({"email": req.body.email})

    if(user){
       let checkPwd = bcrypt.compareSync(req.body.password,user.password)


            if(!checkPwd){
                
                return res.json({message:"Les mots de passe ne concordent pas"})
            }
            // Création de notre token à la connexion
            const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {
                expiresIn: "24h"
            })

            
          // /!\ NE JAMAIS RENVOYER LE MOT DE PASSE AU CLIENT
            res.json({
                id: user._id,
                login: user.login,
                email:user.email,
                role: user.role,
                token: token
            })

    } else {
        res.json({message: "Aucun utilisateur trouvé avec cette adresse email"})
        }

}





export const GetAllUsers = async (req, res) =>{

const users = await User.find({})

if(!users){
    return res.json({message:"Pas d'utilisateur trouvé"})
}

// Attention on ne renvoie pas le mot de passe
console.log(users);
res.json(users)



}

export const UpdateUserRole = async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;
  
    if (!role) {
      return res.status(400).json({ message: "Le rôle n'est pas spécifié" });
    }
  
    try {
      const user = await User.findById(id);
  
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }
  
      user.role = role;
      await user.save();
  
      res.json({ message: "Rôle mis à jour avec succès" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  export const deleteUser = async (req, res) => {
    const { id } = req.params;
  
    try {
      const user = await User.findById(id);
  
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }
  
      await User.deleteOne({ _id: id });
  
      res.json({ message: "Utilisateur supprimé avec succès" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };


//   export const updateUserEmailAndPassword = async (req, res) => {
//     const { id } = req.params;
//     const { email, password } = req.body;
  
//     if (!email || !password) {
//       return res.status(400).json({ message: "L'email et le mot de passe doivent être spécifiés" });
//     }
  
//     try {
//       const user = await User.findById(id);
  
//       if (!user) {
//         return res.status(404).json({ message: "Utilisateur non trouvé" });
//       }
  
//       // Hash the new password before saving it
//       const salt = await bcrypt.genSalt(10);
//       const hashedPassword = await bcrypt.hash(password, salt);
  
//       // Check if the new password is the same as the old one
//       const validPassword = await bcrypt.compare(password, user.password);
//       if (validPassword) {
//         return res.status(400).json({ message: 'Le nouveau mot de passe ne peut pas être le même que l\'ancien' });
//       }
  
//       user.email = email;
//       user.password = hashedPassword;
//       await user.save();
  
//       res.json({ message: "Email et mot de passe mis à jour avec succès" });
//     } catch (error) {
//       res.status(500).json({ message: "Une erreur est survenue lors de la mise à jour de l'email et du mot de passe" });
//     }
// };