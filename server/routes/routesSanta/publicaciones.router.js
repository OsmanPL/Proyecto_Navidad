const express = require("express")
const router = express.Router()
const publicacionController = require("../../controllers/controllersSanta/publicaciones.controller")

router.get("/publicaciones", publicacionController.getPublicaciones)
router.post("/crearPublicacion",publicacionController.crearPublicacion)
router.put("/editarPublicacion",publicacionController.editarPublicacion)
router.delete("/eliminarPublicacion",publicacionController.eliminarPublicacion)

module.exports = router