import { Link } from "react-router-dom";
import Button from "../../components/Button";
import { useCrudApiLista } from "../../hooks/useCrudApiLista";
import Swal from "sweetalert2";
import Tabla from "../../components/Tabla";

export default function Productos() {
  const columnas = ["Nombre", "Categoría", "Stock", "Precio", "Acciones"];
  const { datos, cargando, eliminar } = useCrudApiLista("http://localhost:5107/api/productos");

  const verProducto = (producto) => {
    Swal.fire({
      title: producto.nombre,
      html: `
        <b>Categoría:</b> ${producto.categoria}<br/>
        <b>Stock:</b> ${producto.stock}<br/>
        <b>Precio:</b> ${producto.precio.toFixed(2)} Bs
      `
    });
  };

  if (cargando) {
    return <p>Cargando productos...</p>;
  }

  const filas = datos.map((producto) => [
    producto.nombre,
    producto.categoria,
    producto.stock,
    `${producto.precio.toFixed(2)} Bs`,
    <div className="space-x-2" key={producto.id}>
      <Button size="sm" variant="secondary" onClick={() => verProducto(producto)}>Ver</Button>

      <Button size="sm" variant="edit" asChild>
        <Link to={`/productos/editar/${producto.id}`}>Editar</Link>
      </Button>

      <Button size="sm" variant="destructive" onClick={() => eliminar(producto.id)}>Eliminar</Button>

      <Button size="sm" variant="info" asChild>
  <Link to={`/productos/${producto.id}/detalle`}>Detalles</Link>
</Button>

    </div>
  ]);

  return (
    <div className="p-6 text-black">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Productos Registrados</h2>
        <Button asChild>
          <Link to="/productos/nuevo">+ Nuevo Producto</Link>
        </Button>
      </div>

      <Tabla titulo="Lista de Productos" columnas={columnas} datos={filas} />
    </div>
  );
}
