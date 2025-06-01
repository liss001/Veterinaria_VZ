namespace VeterinariaAPI.DTOs
{
    public class MascotaDTO
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = null!;
        public string? Especie { get; set; }
        public string? Raza { get; set; }
        public DateOnly? FechaNacimiento { get; set; }
        public string? Sexo { get; set; }

        public int PropietarioId { get; set; }
        public string? NombrePropietario { get; set; }
    }
}
