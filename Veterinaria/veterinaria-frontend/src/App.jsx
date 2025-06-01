import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Mascotas from "./pages/MascotasPages/Mascotas";
import Citas from "./pages/CitasPages/Citas";
import Productos from "./pages/ProductosPages/Productos";
import FormularioMascota from "./pages/MascotasPages/FormularioMascota";
import FormularioCita from "./pages/CitasPages/FormularioCita";
import FormularioProducto from "./pages/ProductosPages/FormularioProducto";

// NUEVOS IMPORTS
import Personas from "./pages/PersonasPages/Personas";
import FormularioPersona from "./pages/PersonasPages/FormularioPersona";

// NUEVO IMPORT PARA DETALLE PRODUCTO
import DetalleProducto from "./pages/ProductosPages/DetalleProducto";

export default function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />

          {/* RUTAS PARA MASCOTAS */}
          <Route path="/mascotas" element={<Mascotas />} />
          <Route path="/mascotas/nueva" element={<FormularioMascota modo="crear" />} />
          <Route path="/mascotas/editar/:id" element={<FormularioMascota modo="editar" />} />

          {/* RUTAS PARA CITAS */}
          <Route path="/citas" element={<Citas />} />
          <Route path="/citas/nueva" element={<FormularioCita modo="crear" />} />
          <Route path="/citas/editar/:id" element={<FormularioCita modo="editar" />} />

          {/* RUTAS PARA PRODUCTOS */}
          <Route path="/productos" element={<Productos />} />
          <Route path="/productos/nuevo" element={<FormularioProducto modo="crear" />} />
          <Route path="/productos/editar/:id" element={<FormularioProducto modo="editar" />} />
          <Route path="/productos/:id/detalle" element={<DetalleProducto />} />

          {/* RUTAS PARA PERSONAS */}
          <Route path="/personas" element={<Personas />} />
          <Route path="/personas/nueva" element={<FormularioPersona modo="crear" />} />
          <Route path="/personas/editar/:id" element={<FormularioPersona modo="editar" />} />
          
        </Routes>
      </DashboardLayout>
    </Router>
  );
}
