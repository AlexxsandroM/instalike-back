import {getTodosPosts, criarPost, uploadImagem}from "../models/postModel.js";


export async function listarPosts(req, res) {
  // Obtém todos os posts usando a função getTodosPosts
  const posts = await getTodosPosts();
  // Envia os posts como resposta JSON com status 200 (OK)
  res.status(200).json(posts);
}

export async function postarNovoPost(req, res) {
  const novoPost = req.body;
  try {
      const postCriado = await criarPost(novoPost);
      res.status(200).json(postCriado);
  } catch (erro) {
      console.error(erro.message);
      res.status(500).json({"Erro:":"falha na requisição"});
  }
}

export async function uploadImagem(req, res) {
  const novoPost = req.body;
  try {
      const postCriado = await criarPost(novoPost);
      res.status(200).json(postCriado);
  } catch (erro) {
      console.error(erro.message);
      res.status(500).json({"Erro:":"falha na requisição"});
  }
}

