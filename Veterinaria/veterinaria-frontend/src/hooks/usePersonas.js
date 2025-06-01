import { useEffect, useState } from "react";
import axios from "axios";

export function usePersonas() {
  const [propietarios, setPropietarios] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5107/api/personas")
      .then(res => {
        const soloPropietarios = res.data.filter(p => p.tipoPersona === "Propietario");
        setPropietarios(soloPropietarios);
        setCargando(false);
      })
      .catch(err => {
        console.error("Error al cargar propietarios:", err);
        setCargando(false);
      });
  }, []);

  return { propietarios, cargando };
}
