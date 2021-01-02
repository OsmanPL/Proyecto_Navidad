const express = require("express")
const router = express.Router()
const loginController = require("../controllers/login.controller")

router.get("/iniciarSesion/:user/:password", loginController.iniciarSesion)
router.post("/registrarse",loginController.registrarse)
module.exports = router