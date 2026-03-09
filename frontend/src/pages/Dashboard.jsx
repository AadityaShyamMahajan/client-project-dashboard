import { useEffect, useMemo, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import api from "../api/axios";
import DashboardCards from "../components/DashboardCards";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalClients: 0,
    totalProjects: 0,
    completedProjects: 0,
    inProgressProjects: 0,
  });
  const [projects, setProjects] = useState([]);

  const loadDashboard = async () => {
    const [statsRes, projectsRes] = await Promise.all([
      api.get("/api/dashboard/stats"),
      api.get("/api/projects"),
    ]);
    setStats(statsRes.data);
    setProjects(projectsRes.data);
  };

  useEffect(() => {
    loadDashboard().catch(() => undefined);
  }, []);

  const chartData = useMemo(() => {
    const pending = projects.filter((p) => p.status === "pending").length;
    const inProgress = projects.filter((p) => p.status === "in-progress").length;
    const completed = projects.filter((p) => p.status === "completed").length;

    return {
      labels: ["Pending", "In Progress", "Completed"],
      datasets: [
        {
          label: "Projects",
          data: [pending, inProgress, completed],
          backgroundColor: ["#f59e0b", "#6366f1", "#10b981"],
          borderRadius: 8,
        },
      ],
    };
  }, [projects]);

  return (
    <div className="space-y-6">
      <DashboardCards stats={stats} />
      <div className="rounded-xl bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-slate-800">Project Progress</h2>
        <div className="h-72">
          <Bar
            data={chartData}
            options={{ maintainAspectRatio: false, plugins: { legend: { display: false } } }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
