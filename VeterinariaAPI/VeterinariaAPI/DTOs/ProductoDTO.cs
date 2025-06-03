namespace VeterinariaAPI.DTOs
{
    public class ProductoDTO
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = null!;
        public string? Categoria { get; set; }
        public int Stock { get; set; }
        public decimal Precio { get; set; }
    }
}
