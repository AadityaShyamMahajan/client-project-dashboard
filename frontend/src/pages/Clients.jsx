import { useEffect, useState } from "react";
import api from "../api/axios";
import ClientTable from "../components/ClientTable";
import ClientForm from "../components/ClientForm";

const initialForm = {
  name: "",
  company: "",
  industry: "",
  contactEmail: "",
};

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const loadClients = async () => {
    const response = await api.get("/api/clients");
    setClients(response.data);
  };

  useEffect(() => {
    loadClients().catch(() => undefined);
  }, []);

  const openCreateModal = () => {
    setForm(initialForm);
    setEditingId("");
    setError("");
    setIsModalOpen(true);
  };

  const handleSubmit = async (payload) => {
    setError("");
    setSubmitting(true);

    try {
      if (editingId) {
        await api.put(`/api/clients/${editingId}`, payload);
      } else {
        await api.post("/api/clients", payload);
      }
      setForm(initialForm);
      setEditingId("");
      setIsModalOpen(false);
      await loadClients();
    } catch (err) {
      setError(err.response?.data?.message || "Could not save client");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (client) => {
    setForm({
      name: client.name,
      company: client.company,
      industry: client.industry,
      contactEmail: client.contactEmail,
    });
    setEditingId(client._id);
    setError("");
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/clients/${id}`);
      await loadClients();
    } catch (err) {
      setError(err.response?.data?.message || "Could not delete client");
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-800">Clients</h2>
          <button
            type="button"
            onClick={openCreateModal}
            className="rounded-lg bg-brand-600 px-4 py-2 text-sm text-white hover:bg-brand-700"
          >
            Add Client
          </button>
        </div>
        {error && (
          <div className="mt-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">{error}</div>
        )}
      </div>

      <ClientTable clients={clients} onEdit={handleEdit} onDelete={handleDelete} />

      <ClientForm
        isOpen={isModalOpen}
        mode={editingId ? "edit" : "create"}
        initialData={form}
        onClose={() => {
          setIsModalOpen(false);
          setEditingId("");
          setForm(initialForm);
          setError("");
        }}
        onSubmit={handleSubmit}
        loading={submitting}
        error={error}
      />
    </div>
  );
};

export default Clients;
