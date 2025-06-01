using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace VeterinariaAPI.Models;

[Table("Usuario")]
public partial class Usuario
{
    [Key]
    public int Id { get; set; }

    [StringLength(50)]
    public string NombreUsuario { get; set; } = null!;

    [StringLength(100)]
    public string Contraseña { get; set; } = null!;

    [StringLength(20)]
    public string Rol { get; set; } = null!;

    [InverseProperty("Usuario")]
    public virtual ICollection<Cita> Cita { get; set; } = new List<Cita>();
}
