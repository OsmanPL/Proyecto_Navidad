const express = require("express")
const router = express.Router()
const perfilPadreController = require("../../controllers/controllersAdmin/perfilPadre.controller")

router.get("/getPadres", perfilPadreController.getPadres)
router.post("/crearPadre",perfilPadreController.insertPadre)
router.put("/actualizarPadre",perfilPadreController.updatePadre)
router.delete("/eliminarPadre",perfilPadreController.deletePadre)

module.exports = router