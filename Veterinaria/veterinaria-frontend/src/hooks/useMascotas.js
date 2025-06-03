import { useEffect, useState } from "react";
import axios from "axios";

export function useMascotas() {
  const [mascotas, setMascotas] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5107/api/mascotas").then(res => {
      setMascotas(res.data);
      setCargando(false);
    }).catch(() => setCargando(false));
  }, []);

  return { mascotas, cargando };
}
