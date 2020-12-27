const express = require("express")
const router = express.Router()
const deseosController = require("../../controllers/controllersHijo/deseos.controller")

router.post("/deseos",deseosController.agregarDeseo)

module.exports = router