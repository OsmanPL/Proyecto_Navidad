const express = require("express")
const router = express.Router()
const perfilControllerSanta = require("../../controllers/controllersAdmin/perfilSanta.controller")

router.get("/getPerfilesSanta", perfilControllerSanta.getPerfilesSanta)
router.post("/crearSanta",perfilControllerSanta.insertSanta)
router.put("/actualizarSanta",perfilControllerSanta.updateSanta)
router.delete("/eliminarSanta",perfilControllerSanta.deleteSanta)

module.exports = router