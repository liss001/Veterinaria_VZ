using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace VeterinariaAPI.Models;

public partial class Mascota
{
    [Key]
    public int Id { get; set; }

    [StringLength(100)]
    public string Nombre { get; set; } = null!;

    [StringLength(50)]
    public string? Especie { get; set; }

    [StringLength(50)]
    public string? Raza { get; set; }

    public DateOnly? FechaNacimiento { get; set; }

    [StringLength(10)]
    public string? Sexo { get; set; }

    public int PropietarioId { get; set; }

    [InverseProperty("Mascota")]
    public virtual ICollection<Cita> Cita { get; set; } = new List<Cita>();

    [InverseProperty("Mascota")]
    public virtual ICollection<HistorialMedico> HistorialMedicos { get; set; } = new List<HistorialMedico>();

    [ForeignKey("PropietarioId")]
    [InverseProperty("Mascota")]
    public virtual Persona? Propietario { get; set; }
}
