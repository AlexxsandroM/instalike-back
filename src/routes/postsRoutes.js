import express from "express";
import { listarPosts } from "../controllers/postsControlles.js";

const routes = (app) => {
  // Habilita o parser JSON para lidar com requisições JSON
  app.use(express.json());
  // Rota GET para obter todos os posts
  app.get("/posts", listarPosts);
}

export default routes;
