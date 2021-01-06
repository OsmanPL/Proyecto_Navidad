const express = require("express")
const router = express.Router()
const cartaController = require("../../controllers/controllersSanta/pedidos.controller")

router.get("/cartas", cartaController.getCartas)
router.post("/entregarCarta",cartaController.pedido)
router.delete("/entregadas", cartaController.entregadas)
router.put("/deseos",cartaController.verDeseos)

module.exports = router