import {
  BarChart2,
  Calendar,
  PawPrint,
  ShoppingBag,
  Cog,
} from "lucide-react";
import BarItem from "./BarItem";
import { User } from "lucide-react"; 
export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-gray-900 text-white fixed top-0 left-0 p-6 flex flex-col justify-between z-10 shadow-lg">
      <div>
        <h2 className="text-2xl font-bold mb-8 text-lime-500">🐾 Clínica Vet</h2>

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
            <BarItem href="/personas" icon={<User size={20} />} text="Personas" />
          </nav>
        </div>

        {/* Sección: Otros */}
        <div className="mb-6">
          <p className="uppercase text-gray-400 text-xs mb-3 tracking-wide">Otros</p>
          <nav className="space-y-3">
            <BarItem href="/ajustes" icon={<Cog size={20} />} text="Reportes" />
          </nav>
        </div>
      </div>
    </aside>
  );
}
