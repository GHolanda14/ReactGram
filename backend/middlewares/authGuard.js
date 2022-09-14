const User = require("../models/User");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const authGuard = async (req, res, next) => {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1];

    //Se o cabeçalho tem o token
    if(!token) return res.status(401).json({errors: ["Acesso negado!"]})

    //Token válido?
    try{
        const verificado = jwt.verify(token,jwtSecret);

        req.user = await User.findById(verificado.id).select("-senha");
        next();
    }catch(error){
        res.status(401).json({errors: ["Token inválido"]})
    }
}

module.exports = authGuard;