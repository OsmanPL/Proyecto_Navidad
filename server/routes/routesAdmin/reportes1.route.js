const express = require("express")
const router = express.Router()
const reportesController = require("../../controllers/controllersAdmin/reportes.controller")

router.get("/top10Productos", reportesController.top10ProductosMasComprados)
router.post("/top10Departamentos",reportesController.top10Departamentos)
router.put("/top10Municipios",reportesController.top10municipios)
router.delete("/top5BuenasAccions",reportesController.top5buenasacciones)

module.exports = router