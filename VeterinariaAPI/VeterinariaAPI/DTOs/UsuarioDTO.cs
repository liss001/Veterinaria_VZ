namespace VeterinariaAPI.DTOs
{
    public class UsuarioDTO
    {
        public int Id { get; set; }
        public string NombreUsuario { get; set; } = null!;
        public string Rol { get; set; } = null!;
    }
}
