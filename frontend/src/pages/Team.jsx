import { useEffect, useState } from "react";
import api from "../api/axios";
import TeamTable from "../components/TeamTable";

const initialForm = {
  projectId: "",
  employeeName: "",
  role: "Developer",
};

const Team = () => {
  const [projects, setProjects] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");

  const loadProjects = async () => {
    const response = await api.get("/api/projects");
    setProjects(response.data);
  };

  const loadAssignments = async (projectId) => {
    if (!projectId) {
      setAssignments([]);
      return;
    }

    const response = await api.get(`/api/team/${projectId}`);
    setAssignments(response.data);
  };

  useEffect(() => {
    loadProjects().catch(() => undefined);
  }, []);

  useEffect(() => {
    loadAssignments(selectedProjectId).catch(() => undefined);
  }, [selectedProjectId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      await api.post("/api/team", form);
      setSelectedProjectId(form.projectId);
      setForm({ ...initialForm, projectId: form.projectId });
      await loadAssignments(form.projectId);
    } catch (err) {
      setError(err.response?.data?.message || "Could not assign team member");
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="rounded-xl bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-slate-800">Assign Team Member</h2>
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">{error}</div>
        )}
        <div className="grid gap-4 md:grid-cols-3">
          <select
            required
            value={form.projectId}
            onChange={(event) => setForm({ ...form, projectId: event.target.value })}
            className="rounded-lg border border-slate-300 px-3 py-2"
          >
            <option value="">Select Project</option>
            {projects.map((project) => (
              <option key={project._id} value={project._id}>
                {project.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Employee Name"
            required
            value={form.employeeName}
            onChange={(event) => setForm({ ...form, employeeName: event.target.value })}
            className="rounded-lg border border-slate-300 px-3 py-2"
          />
          <select
            value={form.role}
            onChange={(event) => setForm({ ...form, role: event.target.value })}
            className="rounded-lg border border-slate-300 px-3 py-2"
          >
            <option value="Developer">Developer</option>
            <option value="Analyst">Analyst</option>
            <option value="Tester">Tester</option>
          </select>
        </div>
        <button type="submit" className="mt-4 rounded-lg bg-brand-600 px-4 py-2 text-white">
          Assign Member
        </button>
      </form>

      <div className="rounded-xl bg-white p-5 shadow-sm">
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-slate-700">
            View Team By Project
          </label>
          <select
            value={selectedProjectId}
            onChange={(event) => setSelectedProjectId(event.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 md:w-80"
          >
            <option value="">Select Project</option>
            {projects.map((project) => (
              <option key={project._id} value={project._id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>
        <TeamTable assignments={assignments} />
      </div>
    </div>
  );
};

export default Team;
