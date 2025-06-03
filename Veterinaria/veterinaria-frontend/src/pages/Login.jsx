import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaPaw, FaClinicMedical } from "react-icons/fa"; // Logo tipo clínica veterinaria

export default function Login({ setAuth }) {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5107/api/Usuarios/login", {
        nombreUsuario,
        contraseña,
      });

      const { rol, token } = res.data;
      const rolesPermitidos = ["Administrador", "Recepcionista"];

      if (!rolesPermitidos.includes(rol)) {
        return setError("Solo los roles Administrador o Recepcionista pueden acceder.");
      }

      localStorage.setItem("token", token);
      localStorage.setItem("rol", rol);

      setAuth(true);
      navigate("/");
    } catch (err) {
      console.error(err);
      if (err.response?.status === 403) {
        setError("Acceso denegado. Verifica tu rol.");
      } else {
        setError("Usuario o contraseña incorrectos.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="bg-lime-500 p-3 rounded-full shadow-md">
            <FaPaw className="text-gray-900 text-6xl" />
          </div>
          <span className="text-white font-extrabold text-2xl mt-2">Clínica Vet</span>
        </div>

        <h2 className="text-2xl font-semibold text-white text-center mb-6">Iniciar Sesión</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Usuario"
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-lime-400 transition"
            value={nombreUsuario}
            onChange={(e) => setNombreUsuario(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-lime-400 transition"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-lime-500 hover:bg-lime-400 text-gray-900 font-semibold transition"
          >
            Iniciar Sesión
          </button>
        </form>

        {error && (
          <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
        )}
      </div>
    </div>
  );
}
