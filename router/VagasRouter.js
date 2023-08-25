const router = require("express").Router()
const VagasController = require("../controllers/VagasController")
const checkToken = require("../token/checkToken")

router.post("/cadastro/vagas/:id", checkToken, VagasController.cadastraVagas)
router.get("/buscar-vagas", VagasController.listaVagasPorTecnologia)

module.exports = router