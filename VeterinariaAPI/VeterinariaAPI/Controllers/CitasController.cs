using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VeterinariaAPI.DTOs;
using VeterinariaAPI.Models;

namespace VeterinariaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CitasController : ControllerBase
    {
        private readonly VeterinariaContext _context;

        public CitasController(VeterinariaContext context)
        {
            _context = context;
        }

        // GET: api/Citas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CitaDTO>>> GetCitas()
        {
            var citas = await _context.Citas
                .Include(c => c.Mascota)
                .Include(c => c.Veterinario)
                .Select(c => new CitaDTO
                {
                    Id = c.Id,
                    FechaHora = c.FechaHora,
                    Motivo = c.Motivo,
                    MascotaId = c.MascotaId,
                    NombreMascota = c.Mascota != null ? c.Mascota.Nombre : null,
                    UsuarioId = c.UsuarioId,
                    VeterinarioId = c.VeterinarioId,
                    NombreVeterinario = c.Veterinario != null ? c.Veterinario.NombreCompleto : null
                })
                .ToListAsync();

            return Ok(citas);
        }

        // GET: api/Citas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CitaDTO>> GetCita(int id)
        {
            var cita = await _context.Citas
                .Include(c => c.Mascota)
                .Include(c => c.Veterinario)
                .Where(c => c.Id == id)
                .Select(c => new CitaDTO
                {
                    Id = c.Id,
                    FechaHora = c.FechaHora,
                    Motivo = c.Motivo,
                    MascotaId = c.MascotaId,
                    NombreMascota = c.Mascota != null ? c.Mascota.Nombre : null,
                    UsuarioId = c.UsuarioId,
                    VeterinarioId = c.VeterinarioId,
                    NombreVeterinario = c.Veterinario != null ? c.Veterinario.NombreCompleto : null
                })
                .FirstOrDefaultAsync();

            if (cita == null)
                return NotFound();

            return Ok(cita);
        }

        // POST: api/Citas
        [HttpPost]
        public async Task<ActionResult<CitaDTO>> PostCita(CitaDTO citaDto)
        {
            // Map DTO a entidad
            var cita = new Cita
            {
                FechaHora = citaDto.FechaHora,
                Motivo = citaDto.Motivo,
                MascotaId = citaDto.MascotaId,
                UsuarioId = citaDto.UsuarioId,
                VeterinarioId = citaDto.VeterinarioId
            };

            _context.Citas.Add(cita);
            await _context.SaveChangesAsync();

            // Actualiza ID generado en DTO
            citaDto.Id = cita.Id;

            return CreatedAtAction(nameof(GetCita), new { id = cita.Id }, citaDto);
        }

        // PUT: api/Citas/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCita(int id, CitaDTO citaDto)
        {
            if (id != citaDto.Id)
                return BadRequest("El ID de la cita no coincide con el DTO");

            var cita = await _context.Citas.FindAsync(id);
            if (cita == null)
                return NotFound();

            // Actualizar campos
            cita.FechaHora = citaDto.FechaHora;
            cita.Motivo = citaDto.Motivo;
            cita.MascotaId = citaDto.MascotaId;
            cita.UsuarioId = citaDto.UsuarioId;
            cita.VeterinarioId = citaDto.VeterinarioId;

            _context.Entry(cita).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CitaExists(id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        // DELETE: api/Citas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCita(int id)
        {
            var cita = await _context.Citas.FindAsync(id);
            if (cita == null)
                return NotFound();

            _context.Citas.Remove(cita);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CitaExists(int id)
        {
            return _context.Citas.Any(e => e.Id == id);
        }
    }
}
