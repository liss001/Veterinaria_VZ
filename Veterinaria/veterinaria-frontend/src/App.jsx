import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Mascotas from "./pages/MascotasPages/Mascotas";
import Citas from "./pages/CitasPages/Citas";
import Productos from "./pages/ProductosPages/Productos";
import FormularioMascota from "./pages/MascotasPages/FormularioMascota";
import FormularioCita from "./pages/CitasPages/FormularioCita";
import FormularioProducto from "./pages/ProductosPages/FormularioProducto";
import DetalleProducto from "./pages/ProductosPages/DetalleProducto";
import NuevoMovimiento from "./pages/ProductosPages/NuevoMovimiento";
import Personas from "./pages/PersonasPages/Personas";
import FormularioPersona from "./pages/PersonasPages/FormularioPersona";
import Login from "./pages/Login";
import ReporteCitas from "./pages/Reportes/ReporteCitas";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null para mostrar loader

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-gray-700">
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* LOGIN PÚBLICO */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/" />
            ) : (
              <Login setAuth={setIsAuthenticated} />
            )
          }
        />

        {/* RUTAS PRIVADAS */}
        {isAuthenticated && (
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="mascotas" element={<Mascotas />} />
            <Route path="mascotas/nueva" element={<FormularioMascota modo="crear" />} />
            <Route path="mascotas/editar/:id" element={<FormularioMascota modo="editar" />} />
            <Route path="citas" element={<Citas />} />
            <Route path="citas/nueva" element={<FormularioCita modo="crear" />} />
            <Route path="citas/editar/:id" element={<FormularioCita modo="editar" />} />
            <Route path="productos" element={<Productos />} />
            <Route path="productos/nuevo" element={<FormularioProducto modo="crear" />} />
            <Route path="productos/editar/:id" element={<FormularioProducto modo="editar" />} />
            <Route path="productos/:id/detalle" element={<DetalleProducto />} />
            <Route path="productos/:id/movimientos/nuevo" element={<NuevoMovimiento />} />
            <Route path="productos/:id/movimientos/editar/:movimientoId" element={<NuevoMovimiento />} />
           
            <Route path="personas" element={<Personas />} />
            <Route path="personas/nueva" element={<FormularioPersona modo="crear" />} />
            <Route path="personas/editar/:id" element={<FormularioPersona modo="editar" />} />
            <Route path="/reportes/citas" element={<ReporteCitas />} />
          </Route>
        )}

        {/* RUTA CUALQUIERA: REDIRECCIONA AL LOGIN O DASHBOARD */}
        <Route
          path="*"
          element={
            isAuthenticated ? <Navigate to="/" /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </Router>
  );
}
