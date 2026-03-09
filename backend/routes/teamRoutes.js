const express = require("express");
const {
  createTeamAssignment,
  getTeamByProject,
} = require("../controllers/teamController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createTeamAssignment);
router.get("/:projectId", protect, getTeamByProject);

module.exports = router;
