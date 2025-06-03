import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "../../components/Button";
import Swal from "sweetalert2";
import FormularioInput from "../../components/FormularioInput";

export default function NuevoMovimiento() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tipoMovimiento, setTipoMovimiento] = useState("Entrada");
  const [cantidad, setCantidad] = useState("");
  const [producto, setProducto] = useState(null);

  // 1. Obtener datos del producto
  useEffect(() => {
    fetch(`http://localhost:5107/api/productos/${id}`)
      .then((res) => res.json())
      .then((data) => setProducto(data))
      .catch(() => {
        Swal.fire("Error", "No se pudo cargar el producto", "error");
      });
  }, [id]);

  // 2. Función para obtener hora en Bolivia (UTC-4)
  const getFechaHoraBolivia = () => {
    const now = new Date();
    const boliviaTime = new Intl.DateTimeFormat("sv-SE", {
      timeZone: "America/La_Paz",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(now);
    // Devuelve "YYYY-MM-DDTHH:mm:ss"
    return boliviaTime.replace(" ", "T");
  };

  // 3. Guardar movimiento y actualizar stock
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cantidad || isNaN(cantidad) || parseInt(cantidad) <= 0) {
      return Swal.fire("Error", "Cantidad inválida.", "error");
    }
    if (!producto) {
      return Swal.fire("Error", "Producto no cargado", "error");
    }

    let nuevoStock = producto.stock;
    if (tipoMovimiento === "Entrada") {
      nuevoStock += parseInt(cantidad);
    } else {
      if (producto.stock < parseInt(cantidad)) {
        return Swal.fire("Error", "Stock insuficiente para realizar la venta", "error");
      }
      nuevoStock -= parseInt(cantidad);
    }

    const movimientoData = {
      productoId: parseInt(id),
      tipoMovimiento,
      cantidad: parseInt(cantidad),
      fechaMovimiento: getFechaHoraBolivia(),
    };

    try {
      // 3.1 Insertar el movimiento
      const response = await fetch(`http://localhost:5107/api/detalleproductos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(movimientoData),
      });
      if (!response.ok) throw new Error("Error al guardar el movimiento");

      // 3.2 Actualizar stock en el producto
      const actualizarStock = await fetch(`http://localhost:5107/api/productos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...producto, stock: nuevoStock }),
      });
      if (!actualizarStock.ok) throw new Error("No se pudo actualizar el stock del producto");

      // 3.3 Mensaje y redirección a DetalleProducto
      await Swal.fire("Éxito", "Movimiento registrado correctamente", "success");
      navigate(`/productos/${id}/detalle`);
    } catch (error) {
      Swal.fire("Error", "Hubo un problema al guardar", "error");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
        Registrar Movimiento
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Tipo de Movimiento</label>
          <select
            value={tipoMovimiento}
            onChange={(e) => setTipoMovimiento(e.target.value)}
            className="w-full border p-2 rounded"
            required
          >
            <option value="Entrada">Ingreso</option>
            <option value="Salida">Venta</option>
          </select>
        </div>

        <FormularioInput
          label="Cantidad"
          type="number"
          min="1"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
          required
        />

        <div className="flex justify-center gap-4">
          <Button type="submit">Guardar</Button>
          <Button variant="secondary" onClick={() => navigate(`/productos/${id}/detalle`)}>
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}
