const express = require("express")
const router = express.Router()
const cartaController = require("../../controllers/controllersSanta/pedidos.controller")

router.get("/cartas", cartaController.getCartas)
router.post("/entregarCarta",cartaController.pedido)

module.exports = router