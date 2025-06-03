import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const ReporteCitas = () => {
  const [datos, setDatos] = useState([]);
  const [fechaInicio, setFechaInicio] = useState("2025-05-01");
  const [fechaFin, setFechaFin] = useState("2025-06-10");

  useEffect(() => {
    fetch(
      `http://localhost:5107/api/citas/reporte-citas?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Datos recibidos de la API:", data);
        setDatos(data);
      })
      .catch((error) => console.error("Error al obtener datos:", error));
  }, [fechaInicio, fechaFin]);

  // Transformar datos para agrupar por fecha y sumar por estado
  const datosAgrupados = datos.reduce((acc, curr) => {
    const fecha = curr.fecha.split("T")[0];
    if (!acc[fecha]) {
      acc[fecha] = { fecha, Reservado: 0, Cancelado: 0, Completado: 0 };
    }
    acc[fecha][curr.estado] += curr.total;
    return acc;
  }, {});

  const dataFinal = Object.values(datosAgrupados);
  console.log("Datos agrupados para gráfica:", dataFinal);

  const exportarPDF = async () => {
    const input = document.getElementById("grafico");
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 10, 10, 180, 100);
    pdf.save("reporte-citas.pdf");
  };

  return (
    <div className="p-6 bg-gray-100 text-white min-h-screen">
      <h1 className="text-2xl mb-4 font-bold text-gray-900">
        Reporte de Citas
      </h1>

      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="date"
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
          className="p-2 bg-gray-800 text-white rounded"
        />
        <input
          type="date"
          value={fechaFin}
          onChange={(e) => setFechaFin(e.target.value)}
          className="p-2 bg-gray-800 text-white rounded"
        />
        <button
          onClick={exportarPDF}
          className="bg-lime-500 text-black px-4 py-2 rounded hover:bg-lime-400"
        >
          Exportar PDF
        </button>
      </div>

      <div
        id="grafico"
        className="bg-gray-900 p-6 rounded-3xl shadow-xl w-full max-w-screen-2xl mx-auto min-h-[600px]"
      >
        {dataFinal.length === 0 ? (
          <p className="text-gray-400">No hay datos para el rango de fechas seleccionado.</p>
        ) : (
          <ResponsiveContainer width="100%" height={600}>
            <BarChart data={dataFinal}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="fecha" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Reservado" stackId="a" fill="#fcd34d" />     {/* Amarillo intermedio */}
              <Bar dataKey="Cancelado" stackId="a" fill="#ef4444" />     {/* Rojo intermedio */}
              <Bar dataKey="Completado" stackId="a" fill="#a3e635" />    {/* Verde lima intermedio */}
            </BarChart>
          </ResponsiveContainer>

        )}
      </div>
    </div>
  );
};

export default ReporteCitas;
