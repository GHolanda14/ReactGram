const {body} = require("express-validator")

const photoInsertValidation = () => {
    return [
        body("titulo")
        .not()
        .equals("undefined")
        .withMessage("O título é obrigatório")
        .isString(0)
        .withMessage("O título é obrigatório")
        .isLength({min: 3})
        .withMessage("O título precisa ter no mínimo 3 caracteres"),
        body("imagem").custom((value, {req}) =>{
            if(!req.file){
                throw new Error("A imagem é obrigatória")
            }
            return true
        }),
    ]
}

//Essa função não tá funcionando para titulo vazio
const photoUpdateValidation = () =>{
    return [
        body("titulo")
        .isString()
        .withMessage("O titulo é obrigatório!")
        .isLength({min: 3})
        .withMessage("O título precisa ter no mínimo 3 caracteres")
    ]
}

const commentValidation = () =>{
    return [
        body("comentario").isString().withMessage("O comentário é obrigatório.")
    ]
}

module.exports = {photoInsertValidation,photoUpdateValidation,commentValidation}