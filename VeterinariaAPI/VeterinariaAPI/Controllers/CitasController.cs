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
                    NombreVeterinario = c.Veterinario != null ? c.Veterinario.NombreCompleto : null,
                    Estado = c.Estado

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
                    NombreVeterinario = c.Veterinario != null ? c.Veterinario.NombreCompleto : null,
                    Estado = c.Estado

                })
                .FirstOrDefaultAsync();

            if (cita == null)
                return NotFound();

            return Ok(cita);
        }

        // GET: api/Citas/verificar?fechaHora=...&veterinarioId=...
        [HttpGet("verificar")]
        public async Task<ActionResult<bool>> VerificarDisponibilidad([FromQuery] DateTime fechaHora, [FromQuery] int veterinarioId)
        {
            var existeCita = await _context.Citas.AnyAsync(c =>
                c.FechaHora == fechaHora &&
                c.VeterinarioId == veterinarioId &&
                c.Estado != "Cancelado");

            return Ok(!existeCita); // true si está disponible, false si ya hay cita
        }

        // POST: api/Citas
        [HttpPost]
        public async Task<ActionResult<CitaDTO>> PostCita(CitaDTO citaDto)
        {
            // 🔒 Validación: evitar duplicados
            var citaExistente = await _context.Citas.AnyAsync(c =>
                c.FechaHora == citaDto.FechaHora &&
                c.VeterinarioId == citaDto.VeterinarioId &&
                c.Estado != "Cancelado" // opcional: permitir solo si está cancelada
            );

            if (citaExistente)
            {
                return BadRequest("Ya existe una cita para este veterinario en esa fecha y hora.");
            }

            // Map DTO a entidad
            var cita = new Cita
            {
                FechaHora = citaDto.FechaHora,
                Motivo = citaDto.Motivo,
                MascotaId = citaDto.MascotaId,
                UsuarioId = citaDto.UsuarioId,
                VeterinarioId = citaDto.VeterinarioId,
                Estado = citaDto.Estado ?? "Reservado"
            };

            _context.Citas.Add(cita);
            await _context.SaveChangesAsync();

            citaDto.Id = cita.Id;

            return CreatedAtAction(nameof(GetCita), new { id = cita.Id }, citaDto);
        }

        // PUT: api/Citas/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCita(int id, CitaDTO citaDto)
        {
            if (id != citaDto.Id)
            {
                return BadRequest("El ID no coincide.");
            }

            // Validación: evitar duplicados, excluyendo la cita actual
            var conflicto = await _context.Citas.AnyAsync(c =>
                c.Id != id &&
                c.FechaHora == citaDto.FechaHora &&
                c.VeterinarioId == citaDto.VeterinarioId &&
                c.Estado != "Cancelado"
            );

            if (conflicto)
            {
                return BadRequest("Ya existe una cita para este veterinario en esa fecha y hora.");
            }

            var citaExistente = await _context.Citas.FindAsync(id);
            if (citaExistente == null)
            {
                return NotFound();
            }

            // Actualizar campos
            citaExistente.FechaHora = citaDto.FechaHora;
            citaExistente.Motivo = citaDto.Motivo;
            citaExistente.MascotaId = citaDto.MascotaId;
            citaExistente.UsuarioId = citaDto.UsuarioId;
            citaExistente.VeterinarioId = citaDto.VeterinarioId;
            citaExistente.Estado = citaDto.Estado ?? "Reservado";

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Citas.Any(e => e.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
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
        [HttpGet("calendario")]
        public async Task<ActionResult<IEnumerable<object>>> GetCitasCalendario()
        {
            var citas = await _context.Citas
                .Include(c => c.Mascota)
                .Include(c => c.Veterinario)
                .Where(c => c.Estado == "Reservado" || c.Estado == "Completado" || c.Estado == "Cancelado")
                .Select(c => new {
                    id = c.Id,
                    title = c.Motivo + " - " + (c.Mascota != null ? c.Mascota.Nombre : ""),
                    start = c.FechaHora,
                    estado = c.Estado
                })
                .ToListAsync();

            return Ok(citas);
        }
        [HttpGet("reporte-citas")]
        public IActionResult GetReporteCitas(DateTime fechaInicio, DateTime fechaFin)
        {
            var reporte = _context.Citas
                .Where(c => c.FechaHora >= fechaInicio && c.FechaHora <= fechaFin)
                .GroupBy(c => new { Estado = c.Estado, Fecha = c.FechaHora.Date })
                .Select(g => new
                {
                    Fecha = g.Key.Fecha,
                    Estado = g.Key.Estado,
                    Total = g.Count()
                })
                .OrderBy(r => r.Fecha)
                .ThenBy(r => r.Estado)
                .ToList();

            return Ok(reporte);
        }



        private bool CitaExists(int id)
        {
            return _context.Citas.Any(e => e.Id == id);
        }
    }
}
