import express from "express";
import { connectDB } from "./config/database.js";
import cors from "cors";

import router from "./routes/router.js";
import userRouter from "./routes/userRoute.js";
import dotenv from "dotenv";


const app = express();
const port = process.env.PORT;
const BASE_URL = process.env.BASE_URL;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Fichier statique
app.use(express.static("public"));

app.use(cors())


connectDB

// je fais appel à mes routes
app.use(router);
app.use("/", userRouter)

app.listen(port, () => {
  console.log(`Serveur sur: ${BASE_URL}`);
});