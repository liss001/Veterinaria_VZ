namespace VeterinariaAPI.DTOs
{
    public class DetalleProductoDTO
    {
        public int Id { get; set; }
        public int ProductoId { get; set; }
        public string? NombreProducto { get; set; }
        public int Cantidad { get; set; }
        public string? TipoMovimiento { get; set; }
        public DateTime FechaMovimiento { get; set; }
    }
}
