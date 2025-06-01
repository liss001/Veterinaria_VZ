import { useState } from "react";
import { Search, UserCircle, LogOut, User } from "lucide-react";

export default function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  return (
    <header className="sticky top-0 z-20 w-full h-16 bg-lime-600 flex items-center justify-between px-6 shadow-md">
      {/* Buscador */}
      <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-md w-full max-w-md">
        <Search className="text-gray-500" size={20} />
        <input
          type="text"
          placeholder="Buscar..."
          className="w-full outline-none bg-transparent text-gray-800 placeholder-gray-400"
        />
      </div>

      {/* Icono de Usuario */}
      <div className="relative text-gray-300">
        <button
          onClick={toggleMenu}
          className="flex items-center gap-1 hover:text-gray-100 transition"
        >
          <UserCircle size={35} />
        </button>

        {menuAbierto && (
          <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-2xl border border-gray-300 z-50 animate-fade-in p-3">
            {/* Triángulo superior */}
            <div className="absolute -top-2 right-5 w-3 h-3 bg-white rotate-45 border-t border-l border-gray-300 z-[-1]" />

            <div className="px-2 py-1 mb-1 bg-gray-50 rounded-md font-semibold text-gray-700">
              Mi cuenta
            </div>

            <button className="flex items-center gap-3 w-full px-4 py-3 text-gray-300 hover:bg-gray-100 hover:text-gray-800 rounded-md transition text-sm mb-1">
              <User size={18} className="text-lime-600" />
              Ver perfil
            </button>

            <button className="flex items-center gap-3 w-full px-4 py-3 text-gray-300 hover:bg-gray-100 hover:text-gray-800 rounded-md transition text-sm">
              <LogOut size={18} className="text-red-500" />
              Cerrar sesión
            </button>
          </div>
        )}

      </div>

    </header>
  );
}
