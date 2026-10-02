const router = require("express").Router();
const controller = require("../controllers/regulatoryController");
const { authorize } = require("../middleware/authMiddleware");
router.get("/", authorize("regulatory:read"), controller.getRegulatory);
router.post("/", authorize("regulatory:write"), controller.createRegulatoryDeadline);
module.exports = router;

