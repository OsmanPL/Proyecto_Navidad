const express = require("express")
const router = express.Router()
const buenasAccionesController = require("../../controllers/controllersHijo/buenasAcciones.controller")

router.get("/buenasAcciones/:edad", buenasAccionesController.getBuenasAcciones)
router.post("/realizarAccion",buenasAccionesController.realizarAccion)

module.exports = router