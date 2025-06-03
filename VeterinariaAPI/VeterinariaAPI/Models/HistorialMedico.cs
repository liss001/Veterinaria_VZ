using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace VeterinariaAPI.Models;

[Table("HistorialMedico")]
public partial class HistorialMedico
{
    [Key]
    public int Id { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime Fecha { get; set; }

    [StringLength(255)]
    public string? Diagnostico { get; set; }

    [StringLength(255)]
    public string? Tratamiento { get; set; }

    public string? Notas { get; set; }

    public int MascotaId { get; set; }

    public int? CitaId { get; set; }

    public int VeterinarioId { get; set; }

    [ForeignKey("CitaId")]
    [InverseProperty("HistorialMedicos")]
    public virtual Cita? Cita { get; set; }

    [ForeignKey("MascotaId")]
    [InverseProperty("HistorialMedicos")]
    public virtual Mascota? Mascota { get; set; }

    [ForeignKey("VeterinarioId")]
    [InverseProperty("HistorialMedicos")]
    public virtual Persona? Veterinario { get; set; }
}
