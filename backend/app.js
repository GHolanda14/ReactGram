require("dotenv").config();
//DotEnv são as variáveis de ambiente!

const express = require("express");
const cors = require("cors");
const path = require("path");
const  router = require("./routes/Router.js");

const port = process.env.PORT;
const app = express();

//Configurando JSON e form data response
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Resolvendo o cors (Cross Origin Resource Sharing)
//cors conversa entre servers
app.use(cors({credentials: true, origin: "http://localhost:3000"}))

//Diretório de Upload
app.use("/uploads", express.static(path.join(__dirname,"/uploads")))

//Conexão com DB
require("./config/db.js")

//Routes
app.use(router);

app.listen(port,() =>{
    console.log(`APP rodando na porta ${port}`)
})