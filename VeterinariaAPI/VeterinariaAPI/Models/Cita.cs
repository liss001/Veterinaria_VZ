using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace VeterinariaAPI.Models;

public partial class Cita
{
    [Key]
    public int Id { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime FechaHora { get; set; }

    [StringLength(255)]
    public string? Motivo { get; set; }

    public int MascotaId { get; set; }

    public int UsuarioId { get; set; }

    public int? VeterinarioId { get; set; }

    [InverseProperty("Cita")]
    public virtual ICollection<HistorialMedico> HistorialMedicos { get; set; } = new List<HistorialMedico>();

    [ForeignKey("MascotaId")]
    [InverseProperty("Cita")]
    public virtual Mascota? Mascota { get; set; }

    [ForeignKey("UsuarioId")]
    [InverseProperty("Cita")]
    public virtual Usuario? Usuario { get; set; }

    [ForeignKey("VeterinarioId")]
    [InverseProperty("Cita")]
    public virtual Persona? Veterinario { get; set; }
    [StringLength(20)]
    public string Estado { get; set; } = "Reservado";

}
