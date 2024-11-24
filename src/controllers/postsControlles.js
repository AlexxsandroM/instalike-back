import {getTodosPosts, criarPost, atualizarPost} from "../models/postModel.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js";

// Importa as funções para obter todos os posts e criar um novo post do módulo postModel.js
// Importa o módulo fs para realizar operações com o sistema de arquivos

export async function listarPosts(req, res) {
  // Obtém todos os posts do banco de dados utilizando a função getTodosPosts
  const posts = await getTodosPosts();
  // Envia os posts como uma resposta JSON com o status HTTP 200 (OK)
  res.status(200).json(posts);
}

export async function postarNovoPost(req, res) {
  // Obtém os dados do novo post enviados no corpo da requisição
  const novoPost = req.body;
  try {
    // Tenta criar um novo post no banco de dados utilizando a função criarPost
    const postCriado = await criarPost(novoPost);
    // Retorna o post criado como uma resposta JSON com o status HTTP 200 (OK)
    res.status(200).json(postCriado);
  } catch (erro) {
    // Caso ocorra algum erro durante a criação do post, loga o erro no console
    console.error(erro.message);
    // Envia uma resposta com o status HTTP 500 (Internal Server Error) indicando que ocorreu um erro no servidor
    res.status(500).json({"Erro:":"falha na requisição"});
  }
}

export async function uploadImagem(req, res) {
  // Cria um objeto com os dados do novo post, incluindo o nome original da imagem
  const novoPost = {
    descricao: "",
    imgUrl: req.file.originalname,
    alt: ""
  };
  try {
    // Tenta criar um novo post no banco de dados
    const postCriado = await criarPost(novoPost);
    // Gera o novo nome da imagem com base no ID do post criado
    const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
    // Move a imagem para o diretório de uploads com o novo nome
    fs.renameSync(req.file.path, imagemAtualizada);
    // Retorna o post criado como uma resposta JSON
    res.status(200).json(postCriado);
  } catch (erro) {
    // Caso ocorra algum erro, loga o erro no console e envia uma resposta de erro
    console.error(erro.message);
    res.status(500).json({"Erro:":"falha na requisição"});
  }
}

export async function atualizarNovoPost(req, res) {
  const id = req.params.id;
  const urlImagem = `http://localhost:3000/${id}.png`;

  try {
    const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
    const descricao = await gerarDescricaoComGemini(imgBuffer)

    const post = {
      imgUrl: urlImagem,
      descricao: descricao,
      alt: req.body.alt
    };

    const postCriado = await atualizarPost(id, post);
    res.status(200).json(postCriado);
  } catch (erro) {
    console.error(erro.message);
    res.status(500).json({"Erro:":"falha na requisição"});
  }
}