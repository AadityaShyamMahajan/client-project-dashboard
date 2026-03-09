const Navbar = ({ title }) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <header className="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm">
      <h1 className="text-xl font-semibold text-slate-800">{title}</h1>
      <div className="text-right text-sm text-slate-600">
        <p className="font-medium text-slate-800">{user.name || "User"}</p>
        <p className="capitalize">{user.role || "manager"}</p>
      </div>
    </header>
  );
};

export default Navbar;
