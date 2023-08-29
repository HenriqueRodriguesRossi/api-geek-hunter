const router = require("express").Router()
const VagasController = require("../controllers/VagasController")
const checkToken = require("../token/checkToken")

router.post("/cadastro/vagas", checkToken, VagasController.cadastraVagas)
router.get("/buscar-vagas", VagasController.listaVagasPorTecnologia)
router.get("/todas-as-vagas", VagasController.retornaTodasAsVagas)
router.delete("/exluir-vaga",checkToken,  VagasController.excluirVaga)

module.exports = router