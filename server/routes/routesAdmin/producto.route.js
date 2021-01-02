const express = require("express")
const router = express.Router()
const productoController = require("../../controllers/controllersAdmin/producto.controller")

router.get("/getProductos", productoController.getProductos)
router.post("/crearProducto",productoController.insertProducto)
router.put("/actualizarProducto",productoController.updateProducto)
router.delete("/eliminarProducto",productoController.deleteProducto)

module.exports = router