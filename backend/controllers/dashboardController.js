const Client = require("../models/Client");
const Project = require("../models/Project");

const getDashboardStats = async (req, res, next) => {
  try {
    const [totalClients, totalProjects, completedProjects, inProgressProjects] =
      await Promise.all([
        Client.countDocuments(),
        Project.countDocuments(),
        Project.countDocuments({ status: "completed" }),
        Project.countDocuments({ status: "in-progress" }),
      ]);

    res.status(200).json({
      totalClients,
      totalProjects,
      completedProjects,
      inProgressProjects,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardStats,
};
