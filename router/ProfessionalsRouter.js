const ProfissionaisController = require("../controllers/ProfissionaisController");
const router = require("express").Router();

router.post("/candidates/register", ProfissionaisController.registerCandidate);

module.exports = router;
