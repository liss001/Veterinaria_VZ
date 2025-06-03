import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import { useEffect, useState } from "react";

export default function CalendarioCitas({ citas = [] }) {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    const eventosConvertidos = citas.map((cita) => ({
      title: "", // solo color + hora
      start: cita.fechaHora,
      end: new Date(new Date(cita.fechaHora).getTime() + 30 * 60000),

      extendedProps: {
        estado: cita.estado,
        veterinario: cita.nombreVeterinario || "Veterinario no asignado",
      },
    }));
    setEventos(eventosConvertidos);
  }, [citas]);

  const obtenerEstiloEvento = (estado) => {
    switch (estado) {
      case "Reservado":
        return "bg-yellow-300 text-yellow-900";
      case "Completado":
        return "bg-green-300 text-green-900";
      case "Cancelado":
        return "bg-red-300 text-red-900";
      default:
        return "bg-gray-300 text-gray-900";
    }
  };

  const renderEventContent = (eventInfo) => {
    const estado = eventInfo.event.extendedProps.estado;
    const veterinario = eventInfo.event.extendedProps.veterinario;
    const estilo = obtenerEstiloEvento(estado);
    const vista = eventInfo.view.type;

    return (
      <div
        className={`px-1 py-0.5 text-xs rounded ${estilo} truncate overflow-hidden whitespace-nowrap`}
        title={`${eventInfo.timeText} - ${veterinario}`}
        style={{ display: "flex", alignItems: "center", gap: "4px" }} // flex para poner en línea
      >
        <span>{eventInfo.timeText}</span>
        {vista === "timeGridDay" && (
          <span className="text-[10px] font-light truncate">{veterinario}</span>
        )}
      </div>
    );
  };


  return (
    <>
      <style>{`
        .fc .fc-day-today {
          background-color: #e0f2fe !important;
        }
        .fc-event {
          max-width: 100%;
        }
      `}</style>

      <div className="p-4 bg-white rounded-lg shadow">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            start: "prev,next today",
            center: "title",
            end: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          height={600}
          locale={esLocale}
          events={eventos}
          eventContent={renderEventContent}
          slotMinTime="08:00:00"
          slotMaxTime="23:00:00"
          allDaySlot={false}
          nowIndicator={true}
          dayHeaderClassNames="bg-gray-100 text-gray-900 font-bold"
        />
      </div>
    </>
  );
}
