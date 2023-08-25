const router = require("express").Router()
const EmpresaController = require("../controllers/EmpresaController")

router.post("/contratar-programador", EmpresaController.cadastrarEmpresa)

module.exports = router