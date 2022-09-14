const { default: mongoose } = require("mongoose");
const moogoose = require("mongoose");
const { Schema } = moogoose;

const userSchema = new Schema({
    nome: String,
    email: String,
    senha: String,
    imagemPerfil: String,
    bio: String,
},
{
    timestamps: true
})

const User = mongoose.model("User",userSchema);

module.exports = User;