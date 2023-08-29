const router = require("express").Router()
const CompanyController = require("../controllers/CompanyController")

router.post("/contratar-programador", CompanyController.registerCompany)

module.exports = router