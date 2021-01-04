const express = require("express")
const router = express.Router()
const productoController = require("../../controllers/controllersAdmin/recuperarProducto.controller")

router.get("/recuperarProducto/:nombre", productoController.getProductos)

module.exports = router