import { Link } from "react-router-dom";
import Button from "../../components/Button";
import { useCrudApiLista } from "../../hooks/useCrudApiLista";
import Swal from "sweetalert2";
import Tabla from "../../components/Tabla";

export default function Citas() {
  const columnas = ["Fecha", "Motivo", "Mascota", "Veterinario", "Acciones"];
  const { datos, cargando } = useCrudApiLista("http://localhost:5107/api/citas");

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

  const cambiarEstado = async (cita, nuevoEstado) => {
    if (cita.estado === nuevoEstado) return;

    const confirmar = await Swal.fire({
      title: `¿Cambiar estado a "${nuevoEstado}"?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No"
    });

    if (confirmar.isConfirmed) {
      try {
        await fetch(`http://localhost:5107/api/citas/${cita.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...cita,
            estado: nuevoEstado
          }),
        });

        Swal.fire("Éxito", `Estado actualizado a "${nuevoEstado}".`, "success");
        window.location.reload();
      } catch (error) {
        Swal.fire("Error", "No se pudo actualizar el estado", "error");
        console.error(error);
      }
    } else {
      window.location.reload();
    }
  };

  if (cargando) return <p>Cargando citas...</p>;

  // ✅ Ordenar las citas por fecha descendente (más reciente primero)
  const citasOrdenadas = [...datos].sort(
    (a, b) => new Date(b.fechaHora) - new Date(a.fechaHora)
  );

  const filas = citasOrdenadas.map((cita) => {
    const fecha = new Date(cita.fechaHora);
    const esPasada = fecha < new Date();

    // ✅ Estilo dinámico por estado
    const selectClass =
      cita.estado === "Reservado"
        ? "bg-yellow-500"
        : cita.estado === "Completado"
        ? "bg-lime-500"
        : cita.estado === "Cancelado"
        ? "bg-red-500"
        : "bg-gray-800";

    return [
      fecha.toLocaleString(),
      cita.motivo,
      cita.nombreMascota,
      cita.nombreVeterinario,
      <div className="space-y-1 space-x-2" key={cita.id}>
        <Button size="sm" variant="secondary" onClick={() => verCita(cita)}>Ver</Button>

        {/* ✅ Oculta "Editar" si la cita ya pasó */}
        {!esPasada && (
          <Button size="sm" variant="edit" asChild>
            <Link to={`/citas/editar/${cita.id}`}>Editar</Link>
          </Button>
        )}

        <select
          defaultValue={cita.estado}
          className={`text-white text-sm px-2 py-1 rounded shadow ${selectClass}`}
          onChange={(e) => cambiarEstado(cita, e.target.value)}
        >
          <option value="Reservado">Reservado</option>
          <option value="Completado">Completado</option>
          <option value="Cancelado">Cancelado</option>
        </select>
      </div>
    ];
  });

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
