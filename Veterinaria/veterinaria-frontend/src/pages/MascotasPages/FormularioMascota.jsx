import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useCrudApiLista } from "../../hooks/useCrudApiLista";
import { usePersonas } from "../../hooks/usePersonas";
import Button from "../../components/Button";
import FormularioInput from "../../components/FormularioInput";

export default function FormularioMascota() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { actualizar } = useCrudApiLista("http://localhost:5107/api/mascotas");
  const [mascota, setMascota] = useState(null);

  const [nombre, setNombre] = useState("");
  const [especie, setEspecie] = useState("");
  const [raza, setRaza] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [sexo, setSexo] = useState("Macho");
  const [propietarioId, setPropietarioId] = useState("");

  const { propietarios, cargando: cargandoPropietarios } = usePersonas();

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5107/api/mascotas/${id}`)
        .then(res => setMascota(res.data))
        .catch(err => {
          console.error("Error al cargar la mascota:", err);
          Swal.fire("Error", "No se pudo cargar la mascota", "error");
        });
    }
  }, [id]);

  useEffect(() => {
    if (mascota) {
      setNombre(mascota.nombre || "");
      setEspecie(mascota.especie || "");
      setRaza(mascota.raza || "");
      setFechaNacimiento(mascota.fechaNacimiento || "");
      setSexo(mascota.sexo || "Macho");
      setPropietarioId(mascota.propietarioId || "");
    }
  }, [mascota]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const datosMascota = {
      id,
      nombre,
      especie,
      raza,
      fechaNacimiento,
      sexo,
      propietarioId: parseInt(propietarioId),
    };

    try {
      if (id) {
        const exito = await actualizar(id, datosMascota);
        if (!exito) return;
      } else {
        await axios.post("http://localhost:5107/api/mascotas", datosMascota);
        Swal.fire("Creado", "Mascota creada correctamente", "success");
      }
      navigate("/mascotas");
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudo guardar la mascota", "error");
    }
  };

  if (id && !mascota) return <p className="text-center mt-6">Cargando datos de la mascota...</p>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
        {id ? "Editar Mascota" : "Registrar Mascota"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormularioInput label="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} required />
        <FormularioInput label="Especie" value={especie} onChange={e => setEspecie(e.target.value)} required />
        <FormularioInput label="Raza" value={raza} onChange={e => setRaza(e.target.value)} required />
        <FormularioInput
          label="Fecha de Nacimiento"
          type="date"
          value={fechaNacimiento}
          onChange={e => setFechaNacimiento(e.target.value)}
          required
        />
        <FormularioInput label="Sexo">
          <select
            value={sexo}
            onChange={e => setSexo(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="Macho">Macho</option>
            <option value="Hembra">Hembra</option>
          </select>
        </FormularioInput>

        <FormularioInput label="Propietario">
          {cargandoPropietarios ? (
            <p className="text-gray-500">Cargando propietarios...</p>
          ) : (
            <select
              value={propietarioId}
              onChange={e => setPropietarioId(e.target.value)}
              required
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Selecciona un propietario</option>
              {propietarios.map(p => (
                <option key={p.id} value={p.id}>
                  {p.nombreCompleto || p.nombre}
                </option>
              ))}
            </select>
          )}
        </FormularioInput>

        <div className="flex justify-center">
          <Button type="submit">{id ? "Actualizar" : "Crear"}</Button>
        </div>
      </form>
    </div>
  );
}
