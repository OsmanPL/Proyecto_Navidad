const express = require("express")
const router = express.Router()
const conversacionController = require("../../controllers/controllersAdmin/conversacion.controller")

router.get("/getConversacion", conversacionController.getConversasiones)
router.post("/enviarMensaje",conversacionController.enviarMensaje)
router.put("/getMensajes",conversacionController.getMensajes)

module.exports = router