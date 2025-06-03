import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserCircle, LogOut } from "lucide-react";

export default function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  return (
    <header className="sticky top-0 z-20 w-full h-16 bg-lime-600 flex items-center px-6 shadow-md">
      {/* Icono de Usuario alineado a la derecha */}
      <div className="ml-auto relative text-gray-300">
        <button
          onClick={toggleMenu}
          className="flex items-center gap-1 hover:text-lime-500 transition"
        >
          <UserCircle size={35} />
        </button>

        {menuAbierto && (
          <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-2xl border border-gray-300 z-50 animate-fade-in p-2">
            {/* Triángulo superior */}
            <div className="absolute -top-2 right-5 w-3 h-3 bg-white rotate-45 border-t border-l border-gray-300 z-[-1]" />

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-2 text-gray-100 hover:bg-gray-100 hover:text-gray-900 rounded-md transition text-sm"
            >
              <LogOut size={18} className="text-red-500" />
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
