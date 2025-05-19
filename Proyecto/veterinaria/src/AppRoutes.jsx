import { Routes, Route } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import MascotasList from "./modules/Mascotas/MascotasList";
import CitasList from "./modules/Citas/CitasList";
import InventarioList from "./modules/Inventario/InventarioList";
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/mascotas" element={<MascotasList />} />
      <Route path="/citas" element={<CitasList />} />
      <Route path="/inventario" element={<InventarioList />} />
    </Routes>
  );
}
