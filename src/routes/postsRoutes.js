import express from "express";
import multer from "multer";
import { listarPosts, postarNovoPost } from "../controllers/postsControlles.js";


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname);
  }
})

const upload = multer({ dest: "./uploads" , storage})
// linux ou mac
//const upload = multer({ dest: "./uploads"})

const routes = (app) => {
  // Habilita o parser JSON para lidar com requisições JSON
  app.use(express.json());
  // Rota GET para obter todos os posts
  app.get("/posts", listarPosts);
  // Rota POST para criar um novo post
  app.post("/posts", postarNovoPost); 
  app.post("/upload", upload.single("imagem"), uploadImagem); 
  }

export default routes;
