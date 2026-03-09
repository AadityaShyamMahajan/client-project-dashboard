const ClientTable = ({ clients, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-100 text-left text-slate-600">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Company</th>
            <th className="px-4 py-3">Contact</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client._id} className="border-t border-slate-100">
              <td className="px-4 py-3 text-slate-800">{client.name}</td>
              <td className="px-4 py-3 text-slate-700">{client.company}</td>
              <td className="px-4 py-3 text-slate-700">{client.contactEmail}</td>
              <td className="space-x-2 px-4 py-3">
                <button
                  type="button"
                  onClick={() => onEdit(client)}
                  className="rounded bg-brand-600 px-3 py-1 text-white hover:bg-brand-700"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(client._id)}
                  className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {clients.length === 0 && (
            <tr>
              <td colSpan={4} className="px-4 py-6 text-center text-slate-500">
                No clients found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ClientTable;
