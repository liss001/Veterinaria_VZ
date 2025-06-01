namespace VeterinariaAPI.DTOs
{
    public class HistorialMedicoDTO
    {
        public int Id { get; set; }
        public DateTime Fecha { get; set; }
        public string? Diagnostico { get; set; }
        public string? Tratamiento { get; set; }
        public string? Notas { get; set; }

        public int MascotaId { get; set; }
        public string? NombreMascota { get; set; }

        public int? CitaId { get; set; }
        public DateTime? FechaCita { get; set; }

        public int VeterinarioId { get; set; }
        public string? NombreVeterinario { get; set; }
    }
}
