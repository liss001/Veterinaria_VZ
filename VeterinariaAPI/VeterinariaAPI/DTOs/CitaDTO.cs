namespace VeterinariaAPI.DTOs
{
    public class CitaDTO
    {
        public int Id { get; set; }
        public DateTime FechaHora { get; set; }
        public string? Motivo { get; set; }
        public int MascotaId { get; set; }
        public string? NombreMascota { get; set; }
        public int UsuarioId { get; set; }
        public int? VeterinarioId { get; set; }
        public string? NombreVeterinario { get; set; }
        public string? Estado { get; set; }

    }
}
