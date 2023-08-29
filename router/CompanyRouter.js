const router = require("express").Router();
const CompanyController = require("../controllers/CompanyController");

router.post("/hire-developer", CompanyController.registerCompany);

module.exports = router;
