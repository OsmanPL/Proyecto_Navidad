const express = require("express")
const router = express.Router()
const cartaController = require("../../controllers/controllersHijo/carta.controller")

router.post("/carta",cartaController.enviarCarta)
router.get("/verCartas/:nickname",cartaController.verCartas)
router.put("/entregarCarta",cartaController.entregarCarta)

module.exports = router