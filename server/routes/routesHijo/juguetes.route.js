const express = require("express")
const router = express.Router()
const jugueteController = require("../../controllers/controllersHijo/juguetes.controller")

router.post("/juguetes",jugueteController.getJuguetes)

module.exports = router