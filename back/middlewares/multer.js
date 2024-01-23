import multer from "multer";
import path from "path";

// Taile Maximale d'un fichier
const maxSize = 5242800 // ENVIRON 5MO

// Configuration du storage engine
const storageEngine = multer.diskStorage({
    destination: "./public/img", // Emplacement où je veux stocker mes images
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${(file.originalname.split(" ")).join("_")}`);
    }
})

// Initialiser multer
const upload = multer ({
    storage: storageEngine,
    limits: {
        fileSize: maxSize
    },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb)
    }
})

const checkFileType = async (file, cb) =>{

// Autorisation des fichiers img
const fileTypes = /jpg|png|jpeg|gif|webp/; 

//Vérification des extensions des fichiers
const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
const mimeType = fileTypes.test(file.mimetype)

if(extName && mimeType){
    return cb(null, true);
} else {
    cb("Format de fichier non supporté!")
}

}
export default upload