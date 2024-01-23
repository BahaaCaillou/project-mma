import mongoose from "mongoose";

let equipementSchema = mongoose.Schema({
    title: String,
    description: String,
    category: String,
    votes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 }, // Nouvelle propriété pour les downvotes
    hasVoted: { type: [{type: mongoose.Schema.Types.ObjectId, ref:"User"}], default: [] }, // Nouvelle propriété pour les utilisateurs qui ont voté
    hasDownVoted: { type: [{type: mongoose.Schema.Types.ObjectId, ref:"User"}], default: [] },
    date: Date,
    price: String, 
    affiliateLink: String, 
    comments: [
        {
            pseudo: String,
            comment: String, 
            date: Date
        }
    ],
    images: [
        {
            src: String,
            alt: String
        }
    ]
},
{
    timestamps: true
})

let Equipement = mongoose.model("Equipement", equipementSchema)

export default Equipement