import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import { obtenerCitas } from "./citasService";

function CitasList() {
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    const fetchCitas = async () => {
      const data = await obtenerCitas();
      setCitas(data);
    };

    fetchCitas();
  }, []);

  const columnas = ["mascota", "fecha", "motivo", "veterinario"];

  return (
    <div>
      <h2>Lista de Citas</h2>
      <Table columns={columnas} data={citas} />
    </div>
  );
}

export default CitasList;
