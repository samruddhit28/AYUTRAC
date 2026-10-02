const router = require("express").Router();
const { authorize } = require("../middleware/authMiddleware");
router.get("/", authorize("reports:read"), (req, res) => {
  res.json([
    { id: "study-progress", name: "Study Progress", formats: ["CSV", "PDF"] },
    { id: "recruitment", name: "Recruitment Report", formats: ["CSV", "PDF"] },
    { id: "safety", name: "Safety Report", formats: ["CSV", "PDF"] },
    { id: "regulatory", name: "Regulatory Compliance", formats: ["CSV", "PDF"] },
  ]);
});
module.exports = router;

