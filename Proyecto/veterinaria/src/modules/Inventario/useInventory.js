/*import { useState } from "react";
import { obtenerProductos } from "../modules/Inventario/inventarioService";

export default function useInventory() {
  const [productos, setProductos] = useState([]);

  const cargarProductos = async () => {
    try {
      const data = await obtenerProductos();
      setProductos(data);
    } catch (error) {
      console.error("Error cargando productos", error);
    }
  };

  return { productos, cargarProductos };
}*/
