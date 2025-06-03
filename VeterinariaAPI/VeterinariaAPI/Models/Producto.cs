using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace VeterinariaAPI.Models;

[Table("Producto")]
public partial class Producto
{
    [Key]
    public int Id { get; set; }

    [StringLength(100)]
    public string Nombre { get; set; } = null!;

    [StringLength(50)]
    public string? Categoria { get; set; }

    public int Stock { get; set; }

    [Column(TypeName = "decimal(10, 2)")]
    public decimal Precio { get; set; }

    [InverseProperty("Producto")]
    public virtual ICollection<DetalleProducto> DetalleProductos { get; set; } = new List<DetalleProducto>();
}
