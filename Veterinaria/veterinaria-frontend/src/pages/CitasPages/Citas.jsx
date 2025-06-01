import { Link } from "react-router-dom";
import Button from "../../components/Button";
import { useCrudApiLista } from "../../hooks/useCrudApiLista";
import Swal from "sweetalert2";
import Tabla from "../../components/Tabla";

export default function Citas() {
  const columnas = ["Fecha", "Motivo", "Mascota", "Veterinario", "Acciones"];
  const { datos, cargando, eliminar } = useCrudApiLista("http://localhost:5107/api/citas");

  const verCita = (cita) => {
    Swal.fire({
      title: `Cita - ${new Date(cita.fechaHora).toLocaleString()}`,
      html: `
        <b>Motivo:</b> ${cita.motivo}<br/>
        <b>Mascota:</b> ${cita.nombreMascota}<br/>
        <b>Veterinario:</b> ${cita.nombreVeterinario}
      `
    });
  };

  if (cargando) return <p>Cargando citas...</p>;

  const filas = datos.map((cita) => [
    new Date(cita.fechaHora).toLocaleString(),
    cita.motivo,
    cita.nombreMascota,
    cita.nombreVeterinario,
    <div className="space-x-2" key={cita.id}>
      <Button size="sm" variant="secondary" onClick={() => verCita(cita)}>Ver</Button>
      <Button size="sm" variant="edit" asChild>
        <Link to={`/citas/editar/${cita.id}`}>Editar</Link>
      </Button>
      <Button size="sm" variant="destructive" onClick={() => eliminar(cita.id)}>Eliminar</Button>
    </div>
  ]);

  return (
    <div className="p-6 text-black">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Citas Veterinarias</h2>
        <Button asChild>
          <Link to="/citas/nueva">+ Nueva Cita</Link>
        </Button>
      </div>
      <Tabla titulo="Lista de Citas" columnas={columnas} datos={filas} />
    </div>
  );
}
