import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Button from "../../components/Button";
import FormularioInput from "../../components/FormularioInput";

export default function FormularioProducto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [stock, setStock] = useState("");
  const [precio, setPrecio] = useState("");

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5107/api/productos/${id}`)
        .then(res => setProducto(res.data))
        .catch(err => {
          console.error("Error al cargar el producto:", err);
          Swal.fire("Error", "No se pudo cargar el producto", "error");
        });
    }
  }, [id]);

  useEffect(() => {
    if (producto) {
      setNombre(producto.nombre);
      setCategoria(producto.categoria);
      setStock(producto.stock);
      setPrecio(producto.precio);
    }
  }, [producto]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const datos = {
      id,
      nombre,
      categoria,
      stock: parseInt(stock),
      precio: parseFloat(precio)
    };

    try {
      if (id) {
        await axios.put(`http://localhost:5107/api/productos/${id}`, datos);
        Swal.fire("Actualizado", "Producto actualizado correctamente", "success");
      } else {
        await axios.post("http://localhost:5107/api/productos", datos);
        Swal.fire("Creado", "Producto registrado correctamente", "success");
      }
      navigate("/productos");
    } catch (error) {
      console.error("Error al guardar el producto:", error);
      Swal.fire("Error", "No se pudo guardar el producto", "error");
    }
  };

  if (id && !producto) return <p className="text-center mt-6">Cargando datos del producto...</p>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
        {id ? "Editar Producto" : "Registrar Producto"}
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
          <Button type="submit">{id ? "Actualizar" : "Crear"}</Button>
        </div>
      </form>
    </div>
  );
}
