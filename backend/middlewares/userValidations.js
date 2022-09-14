const { body } = require("express-validator");

const userCreateValidation = () => {
  return [
    body("nome")
      .isString()
      .withMessage("O nome é obrigatório!")
      .isLength({ min: 3 })
      .withMessage("O nome deve ter mais de 3 caracteres!"),
    body("email")
      .isString()
      .withMessage("O e-mail é obrigatório!")
      .isEmail()
      .withMessage("Insira um e-mail válido!"),
    body("senha")
      .isString()
      .withMessage("A senha é obrigatória!")
      .isLength({ min: 8 })
      .withMessage("A senha precisa ter no mínimo 8 caracteres!"),
    body("confirmSenha")
      .isString()
      .withMessage("A confirmação de senha é obrigatória!")
      .custom((senha, { req }) => {
        if (senha !== req.body.senha) {
          throw new Error("As senhas não são iguais!");
        }
        return true;
      }),
  ];
};

const loginValidation = () => {
  return [
    body("email")
      .isString()
      .withMessage("O e-mail é obrigatório!")
      .isEmail()
      .withMessage("Insira um e-mail válido!"),
    body("senha").isString().withMessage("A senha é obrigatória!"),
  ];
};

const userUpdateValidation = () => {
  return [
    body("nome")
      .optional()
      .isLength({ min: 3 })
      .withMessage("O nome deve ter mais de 3 caracteres!"),
    body("senha")
      .optional()
      .isLength({ min: 8 })
      .withMessage("A senha precisa ter no mínimo 8 caracteres!")
    ];
}

module.exports = {
  userCreateValidation,
  loginValidation,
  userUpdateValidation
};
