import { useEffect, useState } from "react";
import api from "../api/axios";
import ProjectTable from "../components/ProjectTable";

const initialForm = {
  name: "",
  clientId: "",
  manager: "",
  startDate: "",
  endDate: "",
  status: "pending",
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState("");
  const [error, setError] = useState("");

  const loadData = async () => {
    const [projectsRes, clientsRes] = await Promise.all([
      api.get("/api/projects"),
      api.get("/api/clients"),
    ]);
    setProjects(projectsRes.data);
    setClients(clientsRes.data);
  };

  useEffect(() => {
    loadData().catch(() => undefined);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      if (editingId) {
        await api.put(`/api/projects/${editingId}`, form);
      } else {
        await api.post("/api/projects", form);
      }
      setForm(initialForm);
      setEditingId("");
      await loadData();
    } catch (err) {
      setError(err.response?.data?.message || "Could not save project");
    }
  };

  const handleEdit = (project) => {
    setForm({
      name: project.name,
      clientId: project.clientId?._id || project.clientId,
      manager: project.manager,
      startDate: project.startDate?.slice(0, 10) || "",
      endDate: project.endDate?.slice(0, 10) || "",
      status: project.status,
    });
    setEditingId(project._id);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/projects/${id}`);
      await loadData();
    } catch (err) {
      setError(err.response?.data?.message || "Could not delete project");
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="rounded-xl bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-slate-800">
          {editingId ? "Edit Project" : "Create Project"}
        </h2>
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">{error}</div>
        )}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <input
            type="text"
            placeholder="Project Name"
            required
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            className="rounded-lg border border-slate-300 px-3 py-2"
          />
          <select
            required
            value={form.clientId}
            onChange={(event) => setForm({ ...form, clientId: event.target.value })}
            className="rounded-lg border border-slate-300 px-3 py-2"
          >
            <option value="">Select Client</option>
            {clients.map((client) => (
              <option key={client._id} value={client._id}>
                {client.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Manager"
            required
            value={form.manager}
            onChange={(event) => setForm({ ...form, manager: event.target.value })}
            className="rounded-lg border border-slate-300 px-3 py-2"
          />
          <input
            type="date"
            required
            value={form.startDate}
            onChange={(event) => setForm({ ...form, startDate: event.target.value })}
            className="rounded-lg border border-slate-300 px-3 py-2"
          />
          <input
            type="date"
            required
            value={form.endDate}
            onChange={(event) => setForm({ ...form, endDate: event.target.value })}
            className="rounded-lg border border-slate-300 px-3 py-2"
          />
          <select
            value={form.status}
            onChange={(event) => setForm({ ...form, status: event.target.value })}
            className="rounded-lg border border-slate-300 px-3 py-2"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="mt-4 flex gap-2">
          <button type="submit" className="rounded-lg bg-brand-600 px-4 py-2 text-white">
            {editingId ? "Update Project" : "Create Project"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId("");
                setForm(initialForm);
              }}
              className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <ProjectTable projects={projects} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default Projects;
