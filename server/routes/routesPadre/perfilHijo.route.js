const express = require("express")
const router = express.Router()
const perfilHijoController = require("../../controllers/controllersPadre/perfilHijo.controller")

router.put("/actualizarHijo",perfilHijoController.updateHijo)
router.get("/getHijos", perfilHijoController.getPerfilHijo)

module.exports = router