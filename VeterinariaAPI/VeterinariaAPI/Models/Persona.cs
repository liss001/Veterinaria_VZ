using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace VeterinariaAPI.Models;

[Table("Persona")]
public partial class Persona
{
    [Key]
    public int Id { get; set; }

    [StringLength(100)]
    public string NombreCompleto { get; set; } = null!;

    [StringLength(20)]
    public string? Telefono { get; set; }

    [StringLength(100)]
    public string? Email { get; set; }

    [StringLength(200)]
    public string? Direccion { get; set; }

    [StringLength(20)]
    public string TipoPersona { get; set; } = null!;

    [InverseProperty("Veterinario")]
    public virtual ICollection<Cita> Cita { get; set; } = new List<Cita>();

    [InverseProperty("Veterinario")]
    public virtual ICollection<HistorialMedico> HistorialMedicos { get; set; } = new List<HistorialMedico>();

    [InverseProperty("Propietario")]
    public virtual ICollection<Mascota> Mascota { get; set; } = new List<Mascota>();
}
