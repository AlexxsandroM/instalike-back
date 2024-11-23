import getTodosPosts from "../models/postModel.js";


export async function listarPosts(req, res) {
  // Obtém todos os posts usando a função getTodosPosts
  const posts = await getTodosPosts();
  // Envia os posts como resposta JSON com status 200 (OK)
  res.status(200).json(posts);
}

