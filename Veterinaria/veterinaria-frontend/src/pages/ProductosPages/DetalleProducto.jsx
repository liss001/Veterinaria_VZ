import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Tabla from "../../components/Tabla";
import Button from "../../components/Button";

export default function DetalleProducto() {
  const { id } = useParams();
  const [movimientos, setMovimientos] = useState([]);
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const prodRes = await fetch(`http://localhost:5107/api/productos/${id}`);
        const prodData = await prodRes.json();
        setProducto(prodData);

        const movRes = await fetch(`http://localhost:5107/api/movimientos/producto/${id}`);
        const movData = await movRes.json();
        setMovimientos(movData.filter(m => m.productoId === parseInt(id)));

      } catch (error) {
        console.error("Error al cargar los datos:", error);
      } finally {
        setCargando(false);
      }
    };

    fetchDatos();
  }, [id]);

  if (cargando) return <p className="p-6 text-black">Cargando detalles...</p>;

  const columnas = ["Tipo", "Cantidad", "Fecha"];
  const filas = movimientos.map((mov) => [
    mov.tipoMovimiento,
    mov.cantidad,
    new Date(mov.fechaMovimiento).toLocaleString(),
  ]);
  
  return (
    <div className="p-6 text-black">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          Movimientos de: {producto?.nombre || "Producto"}
        </h2>

        <Button asChild>
          <Link to="/productos">← Volver a productos</Link>
        </Button>
      </div>
        
      <div className="mb-6">
        <p><strong>Categoría:</strong> {producto.categoria}</p>
        <p><strong>Stock actual:</strong> {producto.stock}</p>
        <p><strong>Precio:</strong> {producto.precio.toFixed(2)} Bs</p>
      </div>

      <Tabla titulo="Historial de Movimientos" columnas={columnas} datos={filas} />
    </div>
  );
}
