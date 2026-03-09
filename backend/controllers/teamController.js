const mongoose = require("mongoose");
const TeamAssignment = require("../models/TeamAssignment");
const Project = require("../models/Project");

const createTeamAssignment = async (req, res, next) => {
  try {
    const { projectId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      res.status(400);
      throw new Error("Invalid project id");
    }

    const projectExists = await Project.exists({ _id: projectId });
    if (!projectExists) {
      res.status(404);
      throw new Error("Project not found");
    }

    const assignment = await TeamAssignment.create(req.body);
    const populatedAssignment = await assignment.populate("projectId");
    res.status(201).json(populatedAssignment);
  } catch (error) {
    next(error);
  }
};

const getTeamByProject = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      res.status(400);
      throw new Error("Invalid project id");
    }

    const assignments = await TeamAssignment.find({ projectId })
      .populate("projectId")
      .sort({ assignedAt: -1 });

    res.status(200).json(assignments);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTeamAssignment,
  getTeamByProject,
};
