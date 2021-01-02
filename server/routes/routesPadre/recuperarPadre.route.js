const express = require("express")
const router = express.Router()
const jugueteController = require("../../controllers/controllersPadre/recuperarPadre.controller")

router.get("/recuperarPadre/:correo",jugueteController.getPadre)

module.exports = router