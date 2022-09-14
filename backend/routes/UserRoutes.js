const express = require("express")
const router = express.Router();

//Controller
const {cadastrar,login, getCurrentUser, update, getUserById} = require("../controllers/UserController")

//Middlewears
const { userCreateValidation, loginValidation, userUpdateValidation } = require("../middlewares/userValidations");
const validate = require("../middlewares/handleValidation");
const authGuard = require("../middlewares/authGuard");
const { imageUpload } = require("../middlewares/imageUpload");

//Rotas
router.post("/cadastrar",userCreateValidation(),validate,cadastrar);
router.post("/login",loginValidation(),validate,login);
router.get("/perfil", authGuard,getCurrentUser)
router.put("/",authGuard,userUpdateValidation(),validate, imageUpload.single("profileImage"),update);
router.get("/:id",getUserById)

module.exports = router;