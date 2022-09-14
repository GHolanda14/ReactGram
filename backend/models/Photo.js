const mongoose = require("mongoose");
const {Schema} = mongoose;

const photoSchema = new Schema({
    imagem: String,
    titulo: String,
    likes: Array,
    comentarios: Array,
    userId: mongoose.ObjectId, 
    userName: String
},{
    timestamps: true
})

const Photo = mongoose.model("Photo",photoSchema);

module.exports = Photo;