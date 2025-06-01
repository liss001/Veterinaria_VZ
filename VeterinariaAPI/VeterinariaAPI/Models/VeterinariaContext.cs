using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace VeterinariaAPI.Models;

public partial class VeterinariaContext : DbContext
{
    public VeterinariaContext()
    {
    }

    public VeterinariaContext(DbContextOptions<VeterinariaContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Cita> Citas { get; set; }

    public virtual DbSet<DetalleProducto> DetalleProductos { get; set; }

    public virtual DbSet<HistorialMedico> HistorialMedicos { get; set; }

    public virtual DbSet<Mascota> Mascotas { get; set; }

    public virtual DbSet<Persona> Personas { get; set; }

    public virtual DbSet<Producto> Productos { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=DESKTOP-ICT2VQV\\SQL_LISS;Initial Catalog=VeterinariaPrueba3;Integrated Security=True;Trust Server Certificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Cita>(entity =>
        {
            entity.ToTable("Cita");
            entity.HasKey(e => e.Id).HasName("PK__Cita__3214EC0725EBD7D5");

            entity.HasOne(d => d.Mascota).WithMany(p => p.Cita)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Cita__MascotaId__3E52440B");

            entity.HasOne(d => d.Usuario).WithMany(p => p.Cita)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Cita__UsuarioId__3F466844");

            entity.HasOne(d => d.Veterinario).WithMany(p => p.Cita).HasConstraintName("FK__Cita__Veterinari__403A8C7D");
        });

        modelBuilder.Entity<DetalleProducto>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__DetalleP__3214EC07AE170BE9");

            entity.HasOne(d => d.Producto).WithMany(p => p.DetalleProductos)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__DetallePr__Produ__49C3F6B7");
        });

        modelBuilder.Entity<HistorialMedico>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Historia__3214EC07C58AFE67");

            entity.HasOne(d => d.Cita).WithMany(p => p.HistorialMedicos).HasConstraintName("FK__Historial__CitaI__440B1D61");

            entity.HasOne(d => d.Mascota).WithMany(p => p.HistorialMedicos)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Historial__Masco__4316F928");

            entity.HasOne(d => d.Veterinario).WithMany(p => p.HistorialMedicos)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Historial__Veter__44FF419A");
        });

        modelBuilder.Entity<Mascota>(entity =>
        {
            entity.ToTable("Mascota");
            entity.HasKey(e => e.Id).HasName("PK__Mascota__3214EC0762E5B8DC");

            entity.HasOne(d => d.Propietario).WithMany(p => p.Mascota)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Mascota__Propiet__3B75D760");
        });

        modelBuilder.Entity<Persona>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Persona__3214EC079D5DD214");
        });

        modelBuilder.Entity<Producto>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Producto__3214EC074B503527");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Usuario__3214EC07F6C601EB");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
