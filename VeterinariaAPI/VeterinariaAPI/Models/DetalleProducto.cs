using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace VeterinariaAPI.Models;

[Table("DetalleProducto")]
public partial class DetalleProducto
{
    [Key]
    public int Id { get; set; }

    public int ProductoId { get; set; }

    public int Cantidad { get; set; }

    [StringLength(20)]
    public string? TipoMovimiento { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime FechaMovimiento { get; set; }

    [ForeignKey("ProductoId")]
    [InverseProperty("DetalleProductos")]
    public virtual Producto? Producto { get; set; }
}
