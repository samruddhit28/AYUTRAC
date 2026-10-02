const router = require("express").Router();
const controller = require("../controllers/studyController");
const { authorize } = require("../middleware/authMiddleware");
router.get("/", authorize("studies:read"), controller.getStudies);
router.get("/:id", authorize("studies:read"), controller.getStudy);
router.post("/", authorize("studies:write"), controller.createStudy);
router.put("/:id", authorize("studies:write"), controller.updateStudy);
router.delete("/:id", authorize("studies:write"), controller.deleteStudy);
module.exports = router;

