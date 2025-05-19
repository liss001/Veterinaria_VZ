import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import { obtenerMascotas } from "./mascotasService";

function MascotasList() {
  const [mascotas, setMascotas] = useState([]);

  useEffect(() => {
    const fetchMascotas = async () => {
      const data = await obtenerMascotas();
      setMascotas(data);
    };

    fetchMascotas();
  }, []);

  const columnas = ["nombre", "edad", "raza", "especie"];

  return (
    <div>
      <h2>Lista de Mascotas</h2>
      <Table columns={columnas} data={mascotas} />
    </div>
  );
}

export default MascotasList;
