const mongoose = require("mongoose");
const Project = require("../models/Project");
const Client = require("../models/Client");

const validateProjectDates = (startDate, endDate) => {
  if (!startDate || !endDate) {
    return;
  }

  if (new Date(endDate) < new Date(startDate)) {
    const error = new Error("endDate cannot be earlier than startDate");
    error.statusCode = 400;
    throw error;
  }
};

const createProject = async (req, res, next) => {
  try {
    const { clientId, startDate, endDate } = req.body;

    if (!mongoose.Types.ObjectId.isValid(clientId)) {
      res.status(400);
      throw new Error("Invalid client id");
    }

    const clientExists = await Client.exists({ _id: clientId });
    if (!clientExists) {
      res.status(404);
      throw new Error("Client not found");
    }

    validateProjectDates(startDate, endDate);

    const project = await Project.create(req.body);
    const populatedProject = await project.populate("clientId");

    res.status(201).json(populatedProject);
  } catch (error) {
    next(error);
  }
};

const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find()
      .populate("clientId")
      .sort({ createdAt: -1 });

    res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
};

const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { clientId, startDate, endDate } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      throw new Error("Invalid project id");
    }

    if (clientId) {
      if (!mongoose.Types.ObjectId.isValid(clientId)) {
        res.status(400);
        throw new Error("Invalid client id");
      }

      const clientExists = await Client.exists({ _id: clientId });
      if (!clientExists) {
        res.status(404);
        throw new Error("Client not found");
      }
    }

    validateProjectDates(startDate, endDate);

    const project = await Project.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    }).populate("clientId");

    if (!project) {
      res.status(404);
      throw new Error("Project not found");
    }

    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};

const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      throw new Error("Invalid project id");
    }

    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      res.status(404);
      throw new Error("Project not found");
    }

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
};
