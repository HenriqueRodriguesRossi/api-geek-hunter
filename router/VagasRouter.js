const router = require("express").Router()
const VagasController = require("../controllers/VagasController")

router.post("/cadastro/vagas", VagasController.cadastraVagas)

module.exports = router