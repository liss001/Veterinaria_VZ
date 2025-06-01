using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VeterinariaAPI.DTOs;
using VeterinariaAPI.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VeterinariaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HistorialesMedicosController : ControllerBase
    {
        private readonly VeterinariaContext _context;

        public HistorialesMedicosController(VeterinariaContext context)
        {
            _context = context;
        }

        // GET: api/HistorialesMedicos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<HistorialMedicoDTO>>> GetHistorialMedicos()
        {
            var historiales = await _context.HistorialMedicos
                .Include(h => h.Mascota)
                .Include(h => h.Cita)
                .Include(h => h.Veterinario)
                .Select(h => new HistorialMedicoDTO
                {
                    Id = h.Id,
                    Fecha = h.Fecha,
                    Diagnostico = h.Diagnostico,
                    Tratamiento = h.Tratamiento,
                    Notas = h.Notas,
                    MascotaId = h.MascotaId,
                    NombreMascota = h.Mascota != null ? h.Mascota.Nombre : null,
                    CitaId = h.CitaId,
                    FechaCita = h.Cita != null ? h.Cita.FechaHora : (DateTime?)null,
                    VeterinarioId = h.VeterinarioId,
                    NombreVeterinario = h.Veterinario != null ? h.Veterinario.NombreCompleto : null
                }).ToListAsync();

            return Ok(historiales);
        }

        // GET: api/HistorialesMedicos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<HistorialMedicoDTO>> GetHistorialMedico(int id)
        {
            var historial = await _context.HistorialMedicos
                .Include(h => h.Mascota)
                .Include(h => h.Cita)
                .Include(h => h.Veterinario)
                .Where(h => h.Id == id)
                .Select(h => new HistorialMedicoDTO
                {
                    Id = h.Id,
                    Fecha = h.Fecha,
                    Diagnostico = h.Diagnostico,
                    Tratamiento = h.Tratamiento,
                    Notas = h.Notas,
                    MascotaId = h.MascotaId,
                    NombreMascota = h.Mascota != null ? h.Mascota.Nombre : null,
                    CitaId = h.CitaId,
                    FechaCita = h.Cita != null ? h.Cita.FechaHora : (DateTime?)null,
                    VeterinarioId = h.VeterinarioId,
                    NombreVeterinario = h.Veterinario != null ? h.Veterinario.NombreCompleto : null
                }).FirstOrDefaultAsync();

            if (historial == null)
                return NotFound();

            return Ok(historial);
        }

        // POST: api/HistorialesMedicos
        [HttpPost]
        public async Task<ActionResult<HistorialMedicoDTO>> PostHistorialMedico(HistorialMedicoDTO dto)
        {
            var historial = new HistorialMedico
            {
                Fecha = dto.Fecha,
                Diagnostico = dto.Diagnostico,
                Tratamiento = dto.Tratamiento,
                Notas = dto.Notas,
                MascotaId = dto.MascotaId,
                CitaId = dto.CitaId,
                VeterinarioId = dto.VeterinarioId
            };

            _context.HistorialMedicos.Add(historial);
            await _context.SaveChangesAsync();

            dto.Id = historial.Id;

            return CreatedAtAction(nameof(GetHistorialMedico), new { id = historial.Id }, dto);
        }

        // PUT: api/HistorialesMedicos/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHistorialMedico(int id, HistorialMedicoDTO dto)
        {
            if (id != dto.Id)
                return BadRequest("El id no coincide con el DTO");

            var historial = await _context.HistorialMedicos.FindAsync(id);
            if (historial == null)
                return NotFound();

            historial.Fecha = dto.Fecha;
            historial.Diagnostico = dto.Diagnostico;
            historial.Tratamiento = dto.Tratamiento;
            historial.Notas = dto.Notas;
            historial.MascotaId = dto.MascotaId;
            historial.CitaId = dto.CitaId;
            historial.VeterinarioId = dto.VeterinarioId;

            _context.Entry(historial).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HistorialMedicoExists(id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        // DELETE: api/HistorialesMedicos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHistorialMedico(int id)
        {
            var historial = await _context.HistorialMedicos.FindAsync(id);
            if (historial == null)
                return NotFound();

            _context.HistorialMedicos.Remove(historial);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool HistorialMedicoExists(int id)
        {
            return _context.HistorialMedicos.Any(e => e.Id == id);
        }
    }
}
