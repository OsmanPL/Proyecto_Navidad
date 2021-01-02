const express = require("express")
const router = express.Router()
const jugueteController = require("../../controllers/controllersHijo/recuperarHijo.controller")

router.get("/recuperarHijo/:nickname",jugueteController.getPerfilHijo)

module.exports = router