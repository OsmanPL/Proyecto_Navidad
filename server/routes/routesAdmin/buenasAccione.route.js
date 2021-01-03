const express = require("express")
const router = express.Router()
const buenasController = require("../../controllers/controllersAdmin/buenasAcciones.controller")

router.get("/buenasAcciones", buenasController.getBuenasAcciones)
router.post("/crearBuenaAccion",buenasController.insertBuenaAccion)
router.put("/actualizarBuenaAccion",buenasController.updateBuenaAccion)
router.delete("/eliminarBuenaAccion/:id",buenasController.deleteBuenaAccion)

module.exports = router