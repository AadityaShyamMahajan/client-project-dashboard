const mongoose = require("mongoose");

const teamAssignmentSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  employeeName: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    required: true,
    trim: true,
  },
  assignedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("TeamAssignment", teamAssignmentSchema);
