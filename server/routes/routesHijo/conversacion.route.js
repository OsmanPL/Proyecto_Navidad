const express = require("express")
const router = express.Router()
const conversacionController = require("../../controllers/controllersHijo/conversacion.controller")

router.get("/conversacion/:nickname", conversacionController.getMensajes)
router.post("/enviarMensaje",conversacionController.enviarMensaje)

module.exports = router