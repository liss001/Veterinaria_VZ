import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Button from "../../components/Button";
import FormularioInput from "../../components/FormularioInput";

export default function FormularioProducto() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [stock, setStock] = useState("");
  const [precio, setPrecio] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const datos = {
      nombre,
      categoria,
      stock: parseInt(stock),
      precio: parseFloat(precio)
    };

    try {
      await axios.post("http://localhost:5107/api/productos", datos);
      Swal.fire("Éxito", "Movimiento registrado correctamente", "success");
      navigate(`/productos/${id}`);
    } catch (error) {
      console.error("Error al guardar el producto:", error);
      Swal.fire("Error", "No se pudo guardar el producto", "error");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
        Registrar Producto
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormularioInput
          label="Nombre"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          required
        />

        <FormularioInput
          label="Categoría"
          value={categoria}
          onChange={e => setCategoria(e.target.value)}
          required
        />

        <FormularioInput
          label="Stock"
          type="number"
          value={stock}
          onChange={e => setStock(e.target.value)}
          required
        />

        <FormularioInput
          label="Precio"
          type="number"
          step="0.01"
          value={precio}
          onChange={e => setPrecio(e.target.value)}
          required
        />

        <div className="flex justify-center">
          <Button type="submit">Crear</Button>
        </div>
      </form>
    </div>
  );
}
