import {
  BarChart2,
  Calendar,
  PawPrint,
  ShoppingBag,
  Cog,
} from "lucide-react";
import BarItem from "./BarItem";
import { FaPaw } from "react-icons/fa";

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-gray-900 text-white fixed top-0 left-0 p-6 flex flex-col justify-between z-10 shadow-lg">
      <div>

        {/* Logo */}
        <div className="flex flex-col items-center justify-center mb-10">
          <div className="bg-lime-500 p-3 rounded-full shadow-md">
            <FaPaw className="text-gray-900 text-5xl" />
          </div>
          <span className="text-white font-extrabold text-3xl mt-2">Clínica Vet</span>
        </div>

        {/* Sección: Analítica */}
        <div className="mb-6">
          <p className="uppercase text-gray-400 text-xs mb-3 tracking-wide">Analítica</p>
          <nav className="space-y-3">
            <BarItem href="/" icon={<BarChart2 size={20} />} text="Panel de Control" />
          </nav>
        </div>

        {/* Sección: Base de Datos */}
        <div className="mb-6">
          <p className="uppercase text-gray-400 text-xs mb-3 tracking-wide">Base de Datos</p>
          <nav className="space-y-3">
            <BarItem href="/mascotas" icon={<PawPrint size={20} />} text="Mascotas" />
            <BarItem href="/citas" icon={<Calendar size={20} />} text="Citas" />
            <BarItem href="/productos" icon={<ShoppingBag size={20} />} text="Productos" />
          </nav>
        </div>

        {/* Sección: Otros */}
        <div className="mb-6">
          <p className="uppercase text-gray-400 text-xs mb-3 tracking-wide">Otros</p>
          <nav className="space-y-3">
            <BarItem href="/reportes/citas" icon={<Cog size={20} />} text="Reportes de Citas" />
          </nav>
        </div>
      </div>
    </aside>
  );
}
