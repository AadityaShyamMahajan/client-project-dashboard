import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Clients", to: "/clients" },
  { label: "Projects", to: "/projects" },
  { label: "Team", to: "/team" },
  { label: "Reports", to: "/reports" },
];

const Sidebar = ({ onLogout }) => {
  return (
    <aside className="w-full bg-slate-900 text-white lg:min-h-screen lg:w-64">
      <div className="border-b border-slate-700 p-5 text-xl font-semibold">
        CPM Dashboard
      </div>
      <nav className="space-y-1 p-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `block rounded-lg px-4 py-2 text-sm transition ${
                isActive ? "bg-brand-600 text-white" : "text-slate-200 hover:bg-slate-800"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
        <button
          type="button"
          onClick={onLogout}
          className="mt-4 w-full rounded-lg border border-slate-700 px-4 py-2 text-left text-sm text-slate-200 hover:bg-slate-800"
        >
          Logout
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
