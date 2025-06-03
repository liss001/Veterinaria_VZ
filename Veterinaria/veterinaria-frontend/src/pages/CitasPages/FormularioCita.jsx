import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useCrudApiLista } from "../../hooks/useCrudApiLista";
import { useMascotas } from "../../hooks/useMascotas";
import Button from "../../components/Button";
import FormularioInput from "../../components/FormularioInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setHours, setMinutes } from "date-fns";
import CalendarioCitas from "../../components/CalendarioCitas";

export default function FormularioCita() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { actualizar } = useCrudApiLista("http://localhost:5107/api/citas");

    const [cita, setCita] = useState(null);
    const [fechaHora, setFechaHora] = useState(null);
    const [motivo, setMotivo] = useState("");
    const [mascotaId, setMascotaId] = useState("");
    const [veterinarioId, setVeterinarioId] = useState("");
    const [estado, setEstado] = useState("Reservado");
    const [citasExistentes, setCitasExistentes] = useState([]);

    const {
        datos: veterinarios,
        cargando: cargandoVeterinarios,
    } = useCrudApiLista("http://localhost:5107/api/personas?veterinarios=true");

    const { mascotas, cargando: cargandoMascotas } = useMascotas();

    useEffect(() => {
        if (id) {
            axios
                .get(`http://localhost:5107/api/citas/${id}`)
                .then((res) => setCita(res.data))
                .catch(() => {
                    Swal.fire("Error", "No se pudo cargar la cita", "error");
                });
        }
    }, [id]);

    useEffect(() => {
        if (cita) {
            setFechaHora(cita.fechaHora ? new Date(cita.fechaHora) : null);
            setMotivo(cita.motivo);
            setMascotaId(cita.mascotaId?.toString() || "");
            setVeterinarioId(cita.veterinarioId?.toString() || "");
            setEstado(cita.estado || "Reservado");
        }
    }, [cita]);

    useEffect(() => {
        axios
            .get("http://localhost:5107/api/citas")
            .then((res) => setCitasExistentes(res.data))
            .catch(() => console.error("Error al cargar citas existentes"));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!fechaHora) {
            Swal.fire("Fecha inválida", "Por favor selecciona una fecha y hora", "warning");
            return;
        }

        const fechaSeleccionada = fechaHora;
        const minutos = fechaSeleccionada.getMinutes();

        if (minutos !== 0 && minutos !== 30) {
            Swal.fire("Hora inválida", "Solo puedes elegir horas en intervalos de 30 minutos", "warning");
            return;
        }

        const ahora = new Date();
        if (fechaSeleccionada < ahora) {
            Swal.fire("Fecha inválida", "No puedes seleccionar una fecha/hora pasada", "warning");
            return;
        }

        const hora = fechaSeleccionada.getHours();
        if (hora < 8 || hora >= 22) {
            Swal.fire("Horario inválido", "Las citas solo pueden programarse entre 8:00 AM y 10:00 PM", "warning");
            return;
        }

        const fechaLocal = new Date(fechaSeleccionada.getTime() - (fechaSeleccionada.getTimezoneOffset() * 60000));
        const fechaIsoLocal = fechaLocal.toISOString();

        try {
            const respuesta = await axios.get(
                `http://localhost:5107/api/citas/verificar?fechaHora=${fechaSeleccionada.toISOString()}&veterinarioId=${veterinarioId}`
            );

            if (respuesta.data.existe) {
                Swal.fire("Conflicto", "Ya hay una cita agendada para esa fecha y hora con ese veterinario", "error");
                return;
            }

            const datos = {
                id,
                fechaHora: fechaIsoLocal,
                motivo,
                mascotaId: mascotaId ? parseInt(mascotaId) : null,
                usuarioId: 1,
                veterinarioId: veterinarioId ? parseInt(veterinarioId) : null,
                estado,
            };

            if (id) {
                const exito = await actualizar(id, datos);
                if (!exito) return;
                Swal.fire("Actualizado", "Cita actualizada correctamente", "success");
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

    if (id && !cita)
        return <p className="text-center mt-6 text-white">Cargando datos de la cita...</p>;

    return (
        <div className="max-w-7xl mx-auto p-8 bg-gray-900 rounded-xl shadow-xl mt-12 text-gray-700">
            <h2 className="text-3xl font-extrabold mb-8 text-center text-white tracking-wide">
                {id ? "Editar Cita" : "Registrar Cita"}
            </h2>

            <div className="flex flex-col lg:flex-row gap-12">
                {/* Formulario: 1/3 */}
                <form
                    onSubmit={handleSubmit}
                    className="lg:flex-[1] w-full max-w-md mx-auto lg:mx-0 bg-gray-100 p-6 rounded-lg shadow-lg space-y-6"
                >
                    <FormularioInput label="Fecha y Hora">
                        <DatePicker
                            selected={fechaHora}
                            onChange={(date) => setFechaHora(date)}
                            showTimeSelect
                            timeIntervals={30}
                            timeFormat="HH:mm"
                            dateFormat="yyyy-MM-dd HH:mm"
                            minTime={setHours(setMinutes(new Date(), 30), 7)}
                            maxTime={setHours(setMinutes(new Date(), 30), 21)}
                            placeholderText="Selecciona fecha y hora"
                            className="border border-gray-600 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-lime-400 w-full bg-gray-900 text-white"
                            required
                        />
                    </FormularioInput>

                    <FormularioInput label="Motivo">
                        <input
                            value={motivo}
                            onChange={(e) => setMotivo(e.target.value)}
                            required
                            className="bg-gray-900 text-white border border-gray-600 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-lime-400 w-full"
                        />
                    </FormularioInput>

                    <FormularioInput label="Mascota">
                        {cargandoMascotas ? (
                            <p className="text-gray-500">Cargando mascotas...</p>
                        ) : (
                            <select
                                value={mascotaId}
                                onChange={(e) => setMascotaId(e.target.value)}
                                required
                                className="w-full bg-gray-900 text-white border border-gray-600 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-lime-400"
                            >
                                <option value="">Selecciona una mascota</option>
                                {mascotas.map((m) => (
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
                                onChange={(e) => setVeterinarioId(e.target.value)}
                                required
                                className="w-full bg-gray-900 text-white border border-gray-600 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-lime-400"
                            >
                                <option value="">Selecciona un veterinario</option>
                                {veterinarios
                                    .filter((v) => v.tipoPersona === "Veterinario")
                                    .map((v) => (
                                        <option key={v.id} value={v.id}>
                                            {v.nombreCompleto}
                                        </option>
                                    ))}
                            </select>
                        )}
                    </FormularioInput>

                    <FormularioInput label="Estado">
                        <select
                            value={estado}
                            onChange={(e) => setEstado(e.target.value)}
                            required
                            className="w-full bg-gray-900 text-white border border-gray-600 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-lime-400"
                        >
                            <option value="Reservado">Reservado</option>
                            <option value="Completado">Completado</option>
                            <option value="Cancelado">Cancelado</option>
                        </select>
                    </FormularioInput>

                    <div className="flex justify-center">
                        <Button
                            type="submit"
                            className="bg-lime-500 hover:bg-lime-600 transition-colors text-gray-900 font-bold px-8 py-3 rounded-md shadow-md"
                        >
                            {id ? "Actualizar" : "Crear"}
                        </Button>
                    </div>
                </form>

                {/* Calendario: 2/3 */}
                <div className="lg:flex-[2] w-full max-w-4xl mx-auto lg:mx-0 bg-gray-800 p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold mb-4 text-lime-400 text-center">
                        Calendario de Citas
                    </h3>
                    <CalendarioCitas citas={citasExistentes} />
                </div>
            </div>
        </div>
    );
}
