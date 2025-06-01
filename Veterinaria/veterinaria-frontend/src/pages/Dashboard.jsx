import { useEffect, useState } from "react";
import axios from "axios";
import { PawPrint, CalendarCheck, User, Package } from "lucide-react";
import CardResumen from "../components/CardResumen";
import Tabla from "../components/Tabla";

export default function Dashboard() {
  const [resumen, setResumen] = useState({
    mascotas: 0,
    citas: 0,
    veterinarios: 0,
    productos: 0,
  });

  const [citas, setCitas] = useState([]);
  const [veterinarios, setVeterinarios] = useState([]);
  const [productosBajoStock, setProductosBajoStock] = useState([]);
  const [mascotas, setMascotas] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [mascotasRes, personasRes, citasRes, productosRes] = await Promise.all([
          axios.get("http://localhost:5107/api/mascotas"),
          axios.get("http://localhost:5107/api/personas"),
          axios.get("http://localhost:5107/api/citas"),
          axios.get("http://localhost:5107/api/productos"),
        ]);

        const mascotasData = mascotasRes.data;
        setMascotas(mascotasData);
        setResumen(prev => ({ ...prev, mascotas: mascotasData.length }));

        const vets = personasRes.data.filter(p => p.tipoPersona === "Veterinario");
        setVeterinarios(vets);
        setResumen(prev => ({ ...prev, veterinarios: vets.length }));

        const citasData = citasRes.data;
        const citasFormateadas = citasData.map(c => {
          const mascota = mascotasData.find(m => m.id === c.mascotaId);
          const veterinario = vets.find(v => v.id === c.veterinarioId);
          return [
            new Date(c.fechaHora).toLocaleString(),
            mascota ? mascota.nombre : "Sin mascota",
            c.motivo,
            veterinario ? veterinario.nombreCompleto || veterinario.nombre : "Sin veterinario"
          ];
        });
        setCitas(citasFormateadas);
        setResumen(prev => ({ ...prev, citas: citasData.length }));

        const productosBajoStock = productosRes.data.filter(p => p.stock < 50);
        const productosFormateados = productosBajoStock.map(p => [
          p.nombre,
          p.categoria,
          p.stock,
          `${p.precio.toFixed(2)} Bs`
        ]);
        setProductosBajoStock(productosFormateados);
        setResumen(prev => ({ ...prev, productos: productosBajoStock.length }));

      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    }

    fetchData();
  }, []);


  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-700">Panel de Control</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <CardResumen
          titulo="Mascotas"
          cantidad={resumen.mascotas}
          color="bg-blue-600"
          icono={<PawPrint size={32} className="text-white" />}
        />
        <CardResumen
          titulo="Citas"
          cantidad={resumen.citas}
          color="bg-green-600"
          icono={<CalendarCheck size={32} className="text-white" />}
        />
        <CardResumen
          titulo="Veterinarios"
          cantidad={resumen.veterinarios}
          color="bg-yellow-500"
          icono={<User size={32} className="text-white" />}
        />
        <CardResumen
          titulo="Productos con Bajo Stock"
          cantidad={resumen.productos}
          color="bg-purple-600"
          icono={<Package size={32} className="text-white" />}
        />
      </div>

      <div className="space-y-8">
        <Tabla
          titulo="Citas Próximas"
          columnas={["Fecha", "Mascota", "Motivo", "Veterinario"]}
          datos={citas}
        />

        <Tabla
          titulo="Productos con Bajo Stock"
          columnas={["Producto", "Categoría", "Stock", "Precio"]}
          datos={productosBajoStock}
        />
        <Tabla
          titulo="Mascotas"
          columnas={["Nombre", "Especie", "Propietario"]}
          datos={mascotas.map(m => [
            m.nombre,
            m.especie,
            m.nombrePropietario
          ])}
        />

        <Tabla
          titulo="Veterinarios"
          columnas={["Nombre", "Especialidad", "Teléfono"]}
          datos={veterinarios.map(v => [
            v.nombreCompleto || v.nombre,
            v.especialidad || "General",
            v.telefono || "-"
          ])}
        />
      </div>
    </div>
  );
}
