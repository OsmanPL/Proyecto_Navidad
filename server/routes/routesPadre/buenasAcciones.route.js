const express = require("express")
const router = express.Router()
const buenasController = require("../../controllers/controllersPadre/buenasAcciones.controller")

router.get("/getBuenasAcciones/:correo/:nickname", buenasController.getBuenasAcciones)
router.put("/buenaAccionrealizada",buenasController.confirmar)
router.delete("/eliminarBuenaAccion/:id",buenasController.deleteBuenaAccion)

module.exports = router