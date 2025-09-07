export default function Sidebar() {
  return (
    <aside className="bg-brand-dark text-white w-64 min-h-screen p-6">
      <ul className="space-y-4">
        <li className="hover:bg-brand p-2 rounded cursor-pointer">Dashboard</li>
        <li className="hover:bg-brand p-2 rounded cursor-pointer">Analytics</li>
        <li className="hover:bg-brand p-2 rounded cursor-pointer">Settings</li>
        <li className="hover:bg-brand p-2 rounded cursor-pointer">Logout</li>
      </ul>
    </aside>
  );
}
