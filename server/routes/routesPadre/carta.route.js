const express = require("express")
const router = express.Router()
const cartaController = require("../../controllers/controllersPadre/carta.controller")

router.get("/getCartas/:correo/:nickname", cartaController.verCartas)
router.put("/pedido",cartaController.confirmar)
router.post("/deseo",cartaController.editarProducto)
router.delete("/lista/:id",cartaController.ListaDeseos)

module.exports = router