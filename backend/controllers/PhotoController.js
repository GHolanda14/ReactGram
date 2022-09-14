const Photo = require("../models/Photo");
const User = require("../models/User");
const mongoose = require("mongoose");

const insertPhoto = async (req, res) => {
  const { titulo } = req.body;
  const imagem = req.file.fileName;

  const reqUser = req.user;

  const user = await User.findById(reqUser._id);

  const newPhoto = await Photo.create({
    imagem,
    titulo,
    userId: user._id,
    userName: user.nome,
  });

  if (!newPhoto) {
    res.status(422).json({
      errors: "Houve um problema, por favor tente novamente mais tarde.",
    });
    return;
  }

  res.status(201).json(newPhoto);
};

const deletePhoto = async (req, res) => {
  const { id } = req.params;
  const reqUser = req.user;

  try {
    const foto = await Photo.findById(mongoose.Types.ObjectId(id));

    if (!foto) {
      res.status(404).json({ errors: "Foto não encontrada!" });
      return;
    }

    if (!foto.userId.equals(reqUser._id)) {
      res.status(422).json({ errors: "Foto não pertence a esse usuário!" });
      return;
    }

    await Photo.findByIdAndDelete(foto._id);
    res.status(201).json({ message: "Foto excluída com sucesso." });
  } catch (error) {
    res.status(404).json({ errors: "Foto não encontrada!" });
    return;
  }
};

const getAllPhotos = async (req, res) => {
  const fotos = await Photo.find({})
    .sort([["createdAt", -1]])
    .exec();

  return res.status(200).json(fotos);
};

const getUserPhotos = async (req, res) => {
  const { id } = req.params;

  const fotos = await Photo.find({ userId: id })
    .sort([["createdAt", -1]])
    .exec();

  return res.status(201).json(fotos);
};

const getPhotoById = async (req, res) => {
  const { id } = req.params;
  const foto = await Photo.findById(mongoose.Types.ObjectId(id));

  if (!foto) {
    return res.status(404).json({ errors: "Foto não encontrada!" });
  }
  return res.status(201).json(foto);
};

const updatePhoto = async (req,res) =>{
  console.log("Devo estar depois")
  const {id} = req.params;
  const {titulo} = req.body;

  const reqUser = req.user;
  const foto = await Photo.findById(id);

  if(!foto){
    res.status(404).json({errors: "Foto não encontrada!"})
    return
  }
  
  //Foto não pertence ao usuário
  if(!foto.userId.equals(reqUser._id)){
    res.status(422).json({errors: "Ocorreu um erro, por favor tente novamente mais tarde"});
    return
  }

  if(titulo){
    foto.titulo = titulo
  }
  

  await foto.save();

  res.status(201).json({foto,message: "Foto atualizada com sucesso"});
}

const likePhoto = async(req, res) =>{
  const {id} = req.params;
  const reqUser = req.user;
  const foto = await Photo.findById(id);
  
  if(!foto){
    res.status(404).json({errors: "Foto não encontrada!"})
    return
  }

  if(foto.likes.includes(reqUser._id)){
    res.status(202).json({errors: "Você já curtiu essa foto."})
    return
  }

  foto.likes.push(reqUser._id);
  await foto.save();

  res.status(201).json({foto,messsage: "Foto curtida!"})
  return;
}

const commentPhoto = async(req, res) =>{
  const {id} = req.params;
  const reqUser = req.user;
  const {comentario} = req.body;

  const foto = await Photo.findById(id);
  const user = await User.findById(reqUser._id);

  if(!foto){
    res.status(402).json({errors: "Foto não encontrada"});
    return
  }

  if(!user){
    res.status(402).json({errors: "Usuário não encontrado"});
    return
  }

  const userComment = {
    userId: user.id,
    userNome: user.nome,
    imagemPerfil: user.imagemPerfil,
    comentario
  }

  foto.comentarios.push(userComment);

  await foto.save();

  res.status(201).json({message:"Foto comentada",foto})

}

const searchPhotos =  async(req,res) =>{
  const {query} = req.query;

  const fotos = await Photo.find({titulo: new RegExp(query,"i")}).exec();

  res.status(200).json(fotos);
}

module.exports = {
  insertPhoto,
  deletePhoto,
  getAllPhotos,
  getUserPhotos,
  getPhotoById,
  updatePhoto,
  likePhoto,
  commentPhoto,
  searchPhotos
};
