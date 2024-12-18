import express from "express";
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsControlles.js";
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:8000", 
  optionsSuccessStatus: 200
}

// Importa o express para criar a aplicação web
// Importa o multer para lidar com uploads de arquivos
// Importa as funções controladoras do arquivo postsControllers.js

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define o diretório de destino para os uploads como 'uploads/'
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Mantém o nome original do arquivo enviado
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });
//  Configura o multer para usar o storage personalizado

// Define a rota base para a API (opcional)
const routes = (app) => {
  // Habilita o parser JSON para processar requisições no formato JSON
  app.use(express.json());
  app.use(cors(corsOptions));
  // Rota GET para listar todos os posts
  app.get("/posts", listarPosts);

  // Rota POST para criar um novo post
  app.post("/posts", postarNovoPost);

  // Rota POST para upload de imagem e criação de post
  app.post("/upload", upload.single("imagem"), uploadImagem);

  app.put("/upload/:id", atualizarNovoPost);
};

export default routes;