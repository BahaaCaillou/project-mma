import mongoose from "mongoose";
import bcrypt from "bcrypt";

let userSchema =   mongoose.Schema({
    login: {
        type: String,
        required: true
    
    },
    email: {
        type: String,
        unique: true, 
        lowercase:true,
        required: true
    },
    password: String,
    role: {
        type: String,
        default: "Utilisateur",
        required: true 
    },
    favoriteArticles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
      }], 

      favoriteEquipments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Equipement'
      }],

    image: {
        src: String,
        alt: String
    }

},
{
    timestamps: true
}

)


// Hook pré qui sera exécuté avant le save() d'un document , on va hacher le mdp

userSchema.pre("save", function (next) {

    if(!this.isModified("password")){
        return next();
    }

    this.password = bcrypt.hashSync(this.password, 10)
    next()
})

let User = mongoose.model("User", userSchema)


export default User