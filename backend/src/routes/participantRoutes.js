const router = require("express").Router();
const controller = require("../controllers/participantController");
const { authorize } = require("../middleware/authMiddleware");
router.get("/", authorize("participants:read"), controller.getParticipants);
router.post("/", authorize("participants:write"), controller.createParticipant);
module.exports = router;

