namespace VeterinariaAPI.DTOs
{
    public class PersonaDTO
    {
        public int Id { get; set; }
        public string NombreCompleto { get; set; } = null!;
        public string? Telefono { get; set; }
        public string? Email { get; set; }
        public string? Direccion { get; set; }
        public string TipoPersona { get; set; } = null!;
    }
}
