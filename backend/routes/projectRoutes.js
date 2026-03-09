const express = require("express");
const {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

const router = express.Router();

router.route("/").post(createProject).get(getProjects);
router.route("/:id").put(updateProject).delete(deleteProject);

module.exports = router;
