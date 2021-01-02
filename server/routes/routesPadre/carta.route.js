const express = require("express")
const router = express.Router()
const cartaController = require("../../controllers/controllersPadre/carta.controller")

router.get("/getCartas", cartaController.verCartas)
router.put("/pedido",cartaController.confirmar)
router.post("/deseo",cartaController.editarProducto)

module.exports = router