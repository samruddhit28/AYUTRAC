const router = require("express").Router();
const controller = require("../controllers/safetyController");
const { authorize } = require("../middleware/authMiddleware");
router.get("/", authorize("safety:read"), controller.getSafety);
router.post("/", authorize("safety:write"), controller.createSafetyEvent);
module.exports = router;

