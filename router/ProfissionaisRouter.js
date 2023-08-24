const ProfissionaisController = require("../controllers/ProfissionaisController")
const router = require("express").Router()

router.post("/candidates/register", ProfissionaisController.cadastraDev)

module.exports = router