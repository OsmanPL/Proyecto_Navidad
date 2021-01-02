const express = require("express")
const router = express.Router()
const buenasController = require("../../controllers/controllersPadre/buenasAcciones.controller")

router.get("/getBuenasAcciones", buenasController.getBuenasAcciones)
router.put("/buenaAccionrealizada",buenasController.confirmar)

module.exports = router