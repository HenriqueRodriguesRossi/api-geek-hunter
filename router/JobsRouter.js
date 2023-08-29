const router = require("express").Router();
const VagasController = require("../controllers/JobsController");
const checkToken = require("../token/checkToken");

router.post("/register/job", checkToken, VagasController.registerJob);
router.get("/search-jobs", VagasController.listJobsByTechnology);
router.get("/all-jobs", VagasController.getAllJobs);
router.delete("/delete-job", checkToken, VagasController.deleteJob);

module.exports = router;
