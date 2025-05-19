import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";


function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h1>Clínica Veterinaria</h1>
      <p>Bienvenido al sistema de gestión. Elige una opción:</p>

      <div className="dashboard-buttons">
        <Button label="Mascotas" onClick={() => navigate("/mascotas")} />
        <Button label="Citas" onClick={() => navigate("/citas")} />
        <Button label="Inventario" onClick={() => navigate("/inventario")} />
      </div>
    </div>
  );
}

export default Dashboard;
