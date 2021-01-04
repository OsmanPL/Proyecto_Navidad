const express = require("express")
const router = express.Router()
const perfilHijoController = require("../../controllers/controllersAdmin/perfilHijo.controller")

router.get("/getHijos", perfilHijoController.getPerfilHijo)
router.post("/crearHijo",perfilHijoController.insertHijo)
router.put("/actualizarHijo",perfilHijoController.updateHijo)
router.delete("/eliminarHijo/:nickname",perfilHijoController.deleteHijo)

module.exports = router