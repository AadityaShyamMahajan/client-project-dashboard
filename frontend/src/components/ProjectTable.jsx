const formatDate = (value) => {
  if (!value) return "-";
  return new Date(value).toLocaleDateString();
};

const ProjectTable = ({ projects, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-100 text-left text-slate-600">
          <tr>
            <th className="px-4 py-3">Project Name</th>
            <th className="px-4 py-3">Client Name</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Start Date</th>
            <th className="px-4 py-3">End Date</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project._id} className="border-t border-slate-100">
              <td className="px-4 py-3">{project.name}</td>
              <td className="px-4 py-3">{project.clientId?.name || "-"}</td>
              <td className="px-4 py-3 capitalize">{project.status}</td>
              <td className="px-4 py-3">{formatDate(project.startDate)}</td>
              <td className="px-4 py-3">{formatDate(project.endDate)}</td>
              <td className="space-x-2 px-4 py-3">
                <button
                  type="button"
                  onClick={() => onEdit(project)}
                  className="rounded bg-brand-600 px-3 py-1 text-white hover:bg-brand-700"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(project._id)}
                  className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {projects.length === 0 && (
            <tr>
              <td colSpan={6} className="px-4 py-6 text-center text-slate-500">
                No projects found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;
