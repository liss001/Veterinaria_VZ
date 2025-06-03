import { Link } from "react-router-dom";
import Button from "../../components/Button";
import { useCrudApiLista } from "../../hooks/useCrudApiLista";
import Swal from "sweetalert2";
import Tabla from "../../components/Tabla";
import { useState } from "react";

export default function Personas() {
  const columnas = ["Nombre Completo", "Teléfono", "Email", "Dirección", "Tipo", "Acciones"];
  const { datos, cargando, eliminar } = useCrudApiLista("http://localhost:5107/api/personas");
  const [filtroTipo, setFiltroTipo] = useState("Todos");

  const verPersona = (persona) => {
    Swal.fire({
      title: persona.nombreCompleto,
      html: `
        <b>Teléfono:</b> ${persona.telefono || "-"}<br/>
        <b>Email:</b> ${persona.email || "-"}<br/>
        <b>Dirección:</b> ${persona.direccion || "-"}<br/>
        <b>Tipo:</b> ${persona.tipoPersona}
      `
    });
  };

  if (cargando) {
    return <p>Cargando personas...</p>;
  }

  const personasFiltradas = filtroTipo === "Todos"
    ? datos
    : datos.filter(p => p.tipoPersona === filtroTipo);

  const filas = personasFiltradas.map((persona) => [
    persona.nombreCompleto,
    persona.telefono,
    persona.email,
    persona.direccion,
    persona.tipoPersona,
    <div className="flex items-center justify-center space-x-1" key={persona.id}>
      <Button size="sm" variant="secondary" onClick={() => verPersona(persona)}>Ver</Button>
      <Button size="sm" variant="edit" asChild>
        <Link to={`/personas/editar/${persona.id}`}>Editar</Link>
      </Button>
      <Button size="sm" variant="destructive" onClick={() => eliminar(persona.id)}>Eliminar</Button>
    </div>
  ]);

  return (
    <div className="p-6 text-black">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Personas Registradas</h2>
        <Button asChild>
          <Link to="/personas/nueva">+ Nueva Persona</Link>
        </Button>
      </div>

            <div className="mb-4">
        <label className="mr-2 font-medium text-black">Buscar por:</label>
            <select
                value={filtroTipo}
                onChange={(e) => setFiltroTipo(e.target.value)}
                className="bg-[#eaeaf3] text-black border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-green-400"
            >
                <option value="Todos">Todos</option>
                <option value="Veterinario">Veterinario</option>
                <option value="Propietario">Propietario</option>
            </select>
        </div>


      <Tabla
        titulo="Lista de Personas"
        columnas={columnas}
        datos={filas}
        className="text-sm"
      />
    </div>
  );
}
