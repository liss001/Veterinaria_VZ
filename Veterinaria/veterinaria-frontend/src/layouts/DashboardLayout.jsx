import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Navbar />
        <main className="p-6 bg-gray-100 min-h-screen">
          <Outlet /> {/* Aquí se renderizan las páginas hijas como Dashboard, Mascotas, etc. */}
        </main>
      </div>
    </div>
  );
}
