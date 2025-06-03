import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export const useCrudApiLista = (url) => {
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarDatos();
  }, [url]);

  const cargarDatos = () => {
    setCargando(true);
    axios.get(url)
      .then(res => setDatos(res.data))
      .catch(() => {
        Swal.fire("Error", "No se pudieron obtener los datos.", "error");
      })
      .finally(() => setCargando(false));
  };

  const crear = async (nuevo) => {
    try {
      const res = await axios.post(url, nuevo);
      setDatos(prev => [...prev, res.data]);
      Swal.fire("Creado", "Registro creado correctamente.", "success");
      return true;
    } catch {
      Swal.fire("Error", "No se pudo crear el registro.", "error");
      return false;
    }
  };

  const actualizar = async (id, actualizado) => {
    try {
      const res = await axios.put(`${url}/${id}`, actualizado);
      setDatos(prev => prev.map(d => (d.id === Number(id) ? res.data : d)));
      Swal.fire("Actualizado", "Registro actualizado correctamente.", "success");
      return true;
    } catch (error) {
      console.error("Error actualizando:", error.response || error);
      Swal.fire("Error", "No se pudo actualizar el registro.", "error");
      return false;
    }
  };

  const eliminar = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el registro permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${url}/${id}`);
          setDatos(prev => prev.filter(item => item.id !== id));
          Swal.fire("Eliminado", "El registro ha sido eliminado.", "success");
        } catch {
          Swal.fire("Error", "No se pudo eliminar el registro.", "error");
        }
      }
    });
  };

  return { datos, cargando, crear, actualizar, eliminar };
};
