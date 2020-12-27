const express = require("express")
const router = express.Router()
const publicacionController = require("../../controllers/controllersHijo/publicacion.controller")

router.get("/publicaciones", publicacionController.getPublicaciones)
router.post("/comentar",publicacionController.comentar)

module.exports = router