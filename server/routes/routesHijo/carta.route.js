const express = require("express")
const router = express.Router()
const cartaController = require("../../controllers/controllersHijo/carta.controller")

router.post("/carta",cartaController.enviarCarta)
router.get("/verCartas",cartaController.verCartas)

module.exports = router