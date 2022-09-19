const User = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");

const jwtSecret = process.env.JWT_SECRET;

// Gerar token do usuário
const gerarToken = (id) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: "7d",
  });
};

// Cadastrar usuário
const cadastrar = async (req, res) => {
  const { nome, email, senha } = req.body;

  const user = await User.findOne({ email }); //Encontrar email via mongoose

  if (user) {
    res.status(422).json({ errors: ["E-mail já utilizado"] });
    return;
  }

  const salt = await bcrypt.genSalt(); //Gera string aleatória
  const senhaHash = await bcrypt.hash(senha, salt); //Criando hash da senha

  const newUser = await User.create({
    nome,
    email,
    senha: senhaHash,
  });

  if (!newUser) {
    res.status(422).json({
      errors: "Houve algum error, por favor tente novamente mais tarde.",
    });
    return;
  }

  res.status(201).json({
    _id: newUser.id,
    token: gerarToken(newUser._id),
  });
};

//Logar
const login = async (req, res) => {
  const { email, senha } = req.body;

  const user = await User.findOne({ email }); //Encontrar email via mongoose

  if (!user) {
    res.status(404).json({ errors: ["E-mail e/ou senha inválidos"] });
    return;
  }

  //Checar senha com o bcrypt
  if (!(await bcrypt.compare(senha, user.senha))) {
    res.status(422).json({ errors: ["Credenciais inválidas"] });
    return;
  }

  res.status(201).json({
    _id: user.id,
    imagemPerfil: user.imagemPerfil,
    token: gerarToken(user._id),
  });
};

const getCurrentUser = async (req, res) => {
  const user = req.user;
  res.status(201).json({ user });
};

const update = async (req, res) => {
  const { nome, senha, bio } = req.body;
  let profileImage = null;

  if (req.file) {
    profileImage = req.file.fileName;
  }

  const reqUser = req.user;

  const user = await User.findById(mongoose.Types.ObjectId(reqUser._id)).select(
    "-senha"
  );

  if (nome) {
    user.nome = nome;
  }

  if (senha) {
    const salt = await bcrypt.genSalt(); //Gera string aleatória
    const senhaHash = await bcrypt.hash(senha, salt); //Criando hash da senha

    user.senha = senhaHash;
  }

  if (profileImage) {
    user.profileImage = profileImage;
  }

  if (bio) {
    user.bio = bio;
  }

  await user.save();

  res.status(201).json(user);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(mongoose.Types.ObjectId(id)).select(
      "-senha"
    );

    if (!user) {
      res.status(404).json({ errors: "Usuário não encontrado." });
      return;
    }

    res.status(201).json(user);
  } catch (error) {
    res.status(404).json({ errors: "Usuário não encontrado." });
    return;
  }
};

module.exports = {
  cadastrar,
  login,
  getCurrentUser,
  update,
  getUserById,
};
