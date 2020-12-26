const express = require("express")
const router = express.Router()
const cartaController = require("../../controllers/controllersHijo/carta.controller")

router.post("/carta",cartaController.enviarCarta)

module.exports = router