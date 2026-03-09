import { useEffect, useState } from "react";

const emptyForm = {
  name: "",
  company: "",
  industry: "",
  contactEmail: "",
};

const ClientForm = ({ isOpen, mode, initialData, onClose, onSubmit, loading, error }) => {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (isOpen) {
      setForm(initialData || emptyForm);
    }
  }, [isOpen, initialData]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      <div className="w-full max-w-2xl rounded-xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-semibold text-slate-800">
            {mode === "edit" ? "Edit Client" : "Add New Client"}
          </h2>
          <button type="button" onClick={onClose} className="text-slate-500 hover:text-slate-700">
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-4">
          {error && (
            <div className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">{error}</div>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <input
              type="text"
              placeholder="Client Name"
              required
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              className="rounded-lg border border-slate-300 px-3 py-2"
            />
            <input
              type="text"
              placeholder="Company"
              required
              value={form.company}
              onChange={(event) => setForm({ ...form, company: event.target.value })}
              className="rounded-lg border border-slate-300 px-3 py-2"
            />
            <input
              type="text"
              placeholder="Industry"
              required
              value={form.industry}
              onChange={(event) => setForm({ ...form, industry: event.target.value })}
              className="rounded-lg border border-slate-300 px-3 py-2"
            />
            <input
              type="email"
              placeholder="Contact Email"
              required
              value={form.contactEmail}
              onChange={(event) => setForm({ ...form, contactEmail: event.target.value })}
              className="rounded-lg border border-slate-300 px-3 py-2"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-brand-600 px-4 py-2 text-white hover:bg-brand-700 disabled:opacity-70"
            >
              {loading ? "Saving..." : mode === "edit" ? "Update Client" : "Create Client"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientForm;
