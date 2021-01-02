const express = require("express")
const router = express.Router()
const reportesController = require("../../controllers/controllersAdmin/reportes.controller")

router.get("/top5Categoria", reportesController.top5Categoria)
router.post("/bitacora",reportesController.bitacora)
router.put("/topCartas",reportesController.topCartas)

module.exports = router