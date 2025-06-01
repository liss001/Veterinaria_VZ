import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useCrudApiLista } from "../../hooks/useCrudApiLista";
import Button from "../../components/Button";
import FormularioInput from "../../components/FormularioInput";

export default function FormularioPersona() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { actualizar } = useCrudApiLista("http://localhost:5107/api/personas");

  const [persona, setPersona] = useState(null);

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [tipo, setTipo] = useState("Propietario");

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5107/api/personas/${id}`)
        .then(res => setPersona(res.data))
        .catch(err => {
          console.error("Error al cargar la persona:", err);
          Swal.fire("Error", "No se pudo cargar la persona", "error");
        });
    }
  }, [id]);

  useEffect(() => {
    if (persona) {
      const partes = persona.nombreCompleto?.trim().split(" ") || [""];
      setNombre(partes[0]);
      setApellido(partes.slice(1).join(" "));
      setCorreo(persona.email || "");
      setTelefono(persona.telefono || "");
      setDireccion(persona.direccion || "");
      setTipo(persona.tipoPersona || "Propietario");
    }
  }, [persona]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const datosPersona = {
      id,
      nombreCompleto: `${nombre} ${apellido}`.trim(),
      email: correo,
      telefono,
      direccion,
      tipoPersona: tipo,
    };

    try {
      if (id) {
        const exito = await actualizar(id, datosPersona);
        if (!exito) return;
        Swal.fire("Actualizado", "Persona actualizada correctamente", "success");
      } else {
        await axios.post("http://localhost:5107/api/personas", datosPersona);
        Swal.fire("Creado", "Persona registrada correctamente", "success");
      }
      navigate("/personas");
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudo guardar la persona", "error");
    }
  };

  if (id && !persona) return <p className="text-center mt-6">Cargando datos de la persona...</p>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
        {id ? "Editar Persona" : "Registrar Persona"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormularioInput label="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} required />
        <FormularioInput label="Apellido" value={apellido} onChange={e => setApellido(e.target.value)} required />
        <FormularioInput label="Correo" value={correo} onChange={e => setCorreo(e.target.value)} required />
        <FormularioInput label="Teléfono" value={telefono} onChange={e => setTelefono(e.target.value)} required />
        <FormularioInput label="Dirección" value={direccion} onChange={e => setDireccion(e.target.value)} required />

        <FormularioInput label="Tipo">
          <select
            value={tipo}
            onChange={e => setTipo(e.target.value)}
            className="border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            <option value="Propietario">Propietario</option>
            <option value="Veterinario">Veterinario</option>
          </select>
        </FormularioInput>

        <div className="flex justify-center">
          <Button type="submit">{id ? "Actualizar" : "Crear"}</Button>
        </div>
      </form>
    </div>
  );
}
