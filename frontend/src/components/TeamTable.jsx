const formatDate = (value) => {
  if (!value) return "-";
  return new Date(value).toLocaleString();
};

const TeamTable = ({ assignments }) => {
  return (
    <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-100 text-left text-slate-600">
          <tr>
            <th className="px-4 py-3">Employee Name</th>
            <th className="px-4 py-3">Role</th>
            <th className="px-4 py-3">Project</th>
            <th className="px-4 py-3">Assigned At</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((item) => (
            <tr key={item._id} className="border-t border-slate-100">
              <td className="px-4 py-3">{item.employeeName}</td>
              <td className="px-4 py-3">{item.role}</td>
              <td className="px-4 py-3">{item.projectId?.name || "-"}</td>
              <td className="px-4 py-3">{formatDate(item.assignedAt)}</td>
            </tr>
          ))}
          {assignments.length === 0 && (
            <tr>
              <td colSpan={4} className="px-4 py-6 text-center text-slate-500">
                No team assignments found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TeamTable;
