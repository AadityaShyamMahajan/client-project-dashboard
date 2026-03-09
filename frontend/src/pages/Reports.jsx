import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import api from "../api/axios";

ChartJS.register(ArcElement, Tooltip, Legend);

const Reports = () => {
  const [stats, setStats] = useState({
    totalClients: 0,
    totalProjects: 0,
    completedProjects: 0,
    inProgressProjects: 0,
  });

  useEffect(() => {
    api
      .get("/api/dashboard/stats")
      .then((response) => setStats(response.data))
      .catch(() => undefined);
  }, []);

  const pending = Math.max(
    0,
    stats.totalProjects - stats.completedProjects - stats.inProgressProjects
  );

  const chartData = {
    labels: ["Completed", "In Progress", "Pending"],
    datasets: [
      {
        data: [stats.completedProjects, stats.inProgressProjects, pending],
        backgroundColor: ["#10b981", "#6366f1", "#f59e0b"],
      },
    ],
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-xl bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-slate-800">Project Distribution</h2>
        <div className="mx-auto h-72 max-w-md">
          <Doughnut data={chartData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>

      <div className="rounded-xl bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-slate-800">Summary</h2>
        <div className="space-y-3 text-sm">
          <p className="flex items-center justify-between border-b pb-2">
            <span className="text-slate-600">Total Clients</span>
            <span className="font-semibold text-slate-800">{stats.totalClients}</span>
          </p>
          <p className="flex items-center justify-between border-b pb-2">
            <span className="text-slate-600">Total Projects</span>
            <span className="font-semibold text-slate-800">{stats.totalProjects}</span>
          </p>
          <p className="flex items-center justify-between border-b pb-2">
            <span className="text-slate-600">Completed Projects</span>
            <span className="font-semibold text-slate-800">{stats.completedProjects}</span>
          </p>
          <p className="flex items-center justify-between">
            <span className="text-slate-600">In Progress Projects</span>
            <span className="font-semibold text-slate-800">{stats.inProgressProjects}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reports;
