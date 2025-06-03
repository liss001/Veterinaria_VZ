import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Tabla from "../../components/Tabla";
import Button from "../../components/Button";
import Swal from "sweetalert2";

export default function DetalleProducto() {
  const { id } = useParams();
  const [movimientos, setMovimientos] = useState([]);
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const prodRes = await fetch(`http://localhost:5107/api/productos/${id}`);
        const prodData = await prodRes.json();
        setProducto(prodData);

        const movRes = await fetch(`http://localhost:5107/api/detalleproductos/producto/${id}`);
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

  const verMovimiento = (mov) => {
    Swal.fire({
      title: mov.tipoMovimiento,
      html: `
        <b>Cantidad:</b> ${mov.cantidad}<br/>
        <b>Fecha:</b> ${new Date(mov.fechaMovimiento).toLocaleString()}
      `
    });
  };

  const eliminarMovimiento = async (movId) => {
    const confirm = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Este movimiento se eliminará permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    });

    if (confirm.isConfirmed) {
      try {
        await fetch(`http://localhost:5107/api/detalleproductos/${movId}`, {
          method: "DELETE"
        });
        setMovimientos(prev => prev.filter(m => m.id !== movId));
        Swal.fire("Eliminado", "El movimiento ha sido eliminado.", "success");
      } catch (error) {
        Swal.fire("Error", "No se pudo eliminar el movimiento.", "error");
      }
    }
  };

  if (cargando) return <p className="p-6 text-black">Cargando detalles...</p>;

  const columnas = ["Tipo", "Cantidad", "Fecha", "Acciones"];
  const filas = movimientos.map((mov) => [
    mov.tipoMovimiento,
    mov.cantidad,
    new Date(mov.fechaMovimiento).toLocaleString(),
    <div className="space-x-2" key={mov.id}>
      <Button size="sm" variant="secondary" onClick={() => verMovimiento(mov)}>Ver</Button>

      

      <Button size="sm" variant="destructive" onClick={() => eliminarMovimiento(mov.id)}>Eliminar</Button>
    </div>
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

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Historial de Movimientos</h3>
        <Button className="bg-green-600 hover:bg-green-700 text-white" asChild>
          <Link to={`/productos/${id}/movimientos/nuevo`}>+ Agregar Movimiento</Link>
        </Button>
      </div>

      <Tabla columnas={columnas} datos={filas} />
    </div>
  );
}
