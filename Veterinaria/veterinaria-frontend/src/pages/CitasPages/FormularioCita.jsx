import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useCrudApiLista } from "../../hooks/useCrudApiLista";
import { useMascotas } from "../../hooks/useMascotas";
import Button from "../../components/Button";
import FormularioInput from "../../components/FormularioInput";

export default function FormularioCita() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { actualizar } = useCrudApiLista("http://localhost:5107/api/citas");

    const [cita, setCita] = useState(null);
    const [fechaHora, setFechaHora] = useState("");
    const [motivo, setMotivo] = useState("");
    const [mascotaId, setMascotaId] = useState("");
    const [veterinarioId, setVeterinarioId] = useState("");

    const {
        datos: veterinarios,
        cargando: cargandoVeterinarios
    } = useCrudApiLista("http://localhost:5107/api/personas?veterinarios=true");

    const {
        mascotas,
        cargando: cargandoMascotas
    } = useMascotas();

    useEffect(() => {
        if (id) {
            axios
                .get(`http://localhost:5107/api/citas/${id}`)
                .then(res => setCita(res.data))
                .catch(err => {
                    console.error("Error al cargar la cita:", err);
                    Swal.fire("Error", "No se pudo cargar la cita", "error");
                });
        }
    }, [id]);

    useEffect(() => {
        if (cita) {
            setFechaHora(cita.fechaHora?.slice(0, 16)); // yyyy-MM-ddTHH:mm
            setMotivo(cita.motivo);
            setMascotaId(cita.mascotaId);
            setVeterinarioId(cita.veterinarioId);
        }
    }, [cita]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const datos = {
            id,
            fechaHora,
            motivo,
            mascotaId: mascotaId ? parseInt(mascotaId) : null,
            usuarioId: 1,
            veterinarioId: veterinarioId ? parseInt(veterinarioId) : null
        };

        try {
            if (id) {
                const exito = await actualizar(id, datos);
                if (!exito) return;
            } else {
                await axios.post("http://localhost:5107/api/citas", datos);
                Swal.fire("Creado", "Cita registrada correctamente", "success");
            }
            navigate("/citas");
        } catch (error) {
            console.error("Error al guardar la cita:", error);
            Swal.fire("Error", "No se pudo guardar la cita", "error");
        }
    };

    if (id && !cita) return <p className="text-center mt-6">Cargando datos de la cita...</p>;

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
                {id ? "Editar Cita" : "Registrar Cita"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <FormularioInput
                    label="Fecha y Hora"
                    type="datetime-local"
                    value={fechaHora}
                    onChange={e => setFechaHora(e.target.value)}
                    required
                />

                <FormularioInput
                    label="Motivo"
                    value={motivo}
                    onChange={e => setMotivo(e.target.value)}
                    required
                />

                <FormularioInput label="Mascota">
                    {cargandoMascotas ? (
                        <p className="text-gray-500">Cargando mascotas...</p>
                    ) : (
                        <select
                            value={mascotaId}
                            onChange={e => setMascotaId(e.target.value)}
                            required
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="">Selecciona una mascota</option>
                            {mascotas.map(m => (
                                <option key={m.id} value={m.id}>
                                    {m.nombre}
                                </option>
                            ))}
                        </select>
                    )}
                </FormularioInput>

                <FormularioInput label="Veterinario">
                    {cargandoVeterinarios ? (
                        <p className="text-gray-500">Cargando veterinarios...</p>
                    ) : (
                        <select
                            value={veterinarioId}
                            onChange={e => setVeterinarioId(e.target.value)}
                            required
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="">Selecciona un veterinario</option>
                            {veterinarios
                                .filter(p => p.tipoPersona === "Veterinario")
                                .map(v => (
                                    <option key={v.id} value={v.id}>
                                        {v.nombreCompleto}
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
