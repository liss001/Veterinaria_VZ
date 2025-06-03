import { Link } from "react-router-dom";
import Button from "../../components/Button";
import { useCrudApiLista } from "../../hooks/useCrudApiLista";
import Swal from "sweetalert2";
import Tabla from "../../components/Tabla"; // Asegúrate de tener la ruta correcta

export default function Mascotas() {
  const columnas = ["Nombre", "Especie", "Raza", "Propietario", "Acciones"];
  const { datos, cargando, eliminar } = useCrudApiLista("http://localhost:5107/api/mascotas");

  const verMascota = (mascota) => {
    Swal.fire({
      title: mascota.nombre,
      html: `
        <b>Especie:</b> ${mascota.especie}<br/>
        <b>Raza:</b> ${mascota.raza}<br/>
        <b>Fecha Nacimiento:</b> ${mascota.fechaNacimiento}<br/>
        <b>Sexo:</b> ${mascota.sexo}<br/>
        <b>Propietario:</b> ${mascota.nombrePropietario}
      `
    });
  };

  if (cargando) {
    return <p>Cargando mascotas...</p>;
  }

  // Transformamos los datos para la tabla
  const filas = datos.map((mascota) => [
    mascota.nombre,
    mascota.especie,
    mascota.raza,
    mascota.nombrePropietario,
    <div className="space-x-2" key={mascota.id}>
      <Button size="sm" variant="secondary" onClick={() => verMascota(mascota)}>Ver</Button>
      <Button size="sm" variant="edit" asChild>
        <Link to={`/mascotas/editar/${mascota.id}`}>Editar</Link>
      </Button>
      <Button size="sm" variant="destructive" onClick={() => eliminar(mascota.id)}>Eliminar</Button>
    </div>
  ]);

  return (
    <div className="p-6 text-black">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Mascotas Registradas</h2>
        <Button asChild>
          <Link to="/mascotas/nueva">+ Nueva Mascota</Link>
        </Button>
      </div>
      <Tabla titulo="Lista de Mascotas" columnas={columnas} datos={filas} />
    </div>
  );
}
