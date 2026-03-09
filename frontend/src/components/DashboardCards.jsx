const DashboardCards = ({ stats }) => {
  const cards = [
    { label: "Total Clients", value: stats.totalClients, bg: "bg-blue-50", text: "text-blue-700" },
    { label: "Total Projects", value: stats.totalProjects, bg: "bg-indigo-50", text: "text-indigo-700" },
    { label: "Completed Projects", value: stats.completedProjects, bg: "bg-emerald-50", text: "text-emerald-700" },
    {
      label: "In-Progress Projects",
      value: stats.inProgressProjects,
      bg: "bg-amber-50",
      text: "text-amber-700",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div key={card.label} className={`rounded-xl p-5 shadow-sm ${card.bg}`}>
          <p className="text-sm text-slate-600">{card.label}</p>
          <p className={`mt-2 text-2xl font-semibold ${card.text}`}>{card.value ?? 0}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
