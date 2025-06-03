using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VeterinariaAPI.DTOs;
using VeterinariaAPI.Models;

namespace VeterinariaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MascotasController : ControllerBase
    {
        private readonly VeterinariaContext _context;

        public MascotasController(VeterinariaContext context)
        {
            _context = context;
        }

        // GET: api/Mascotas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MascotaDTO>>> GetMascotas()
        {
            var mascotas = await _context.Mascotas
                .Include(m => m.Propietario)
                .Select(m => new MascotaDTO
                {
                    Id = m.Id,
                    Nombre = m.Nombre,
                    Especie = m.Especie,
                    Raza = m.Raza,
                    FechaNacimiento = m.FechaNacimiento,
                    Sexo = m.Sexo,
                    PropietarioId = m.PropietarioId,
                    NombrePropietario = m.Propietario.NombreCompleto
                })
                .ToListAsync();

            return Ok(mascotas);
        }

        // GET: api/Mascotas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MascotaDTO>> GetMascota(int id)
        {
            var mascota = await _context.Mascotas
                .Include(m => m.Propietario)
                .Where(m => m.Id == id)
                .Select(m => new MascotaDTO
                {
                    Id = m.Id,
                    Nombre = m.Nombre,
                    Especie = m.Especie,
                    Raza = m.Raza,
                    FechaNacimiento = m.FechaNacimiento,
                    Sexo = m.Sexo,
                    PropietarioId = m.PropietarioId,
                    NombrePropietario = m.Propietario.NombreCompleto
                })
                .FirstOrDefaultAsync();

            if (mascota == null)
            {
                return NotFound();
            }

            return Ok(mascota);
        }

        // POST: api/Mascotas
        [HttpPost]
        public async Task<ActionResult<MascotaDTO>> PostMascota(MascotaDTO dto)
        {
            var nuevaMascota = new Mascota
            {
                Nombre = dto.Nombre,
                Especie = dto.Especie,
                Raza = dto.Raza,
                FechaNacimiento = dto.FechaNacimiento,
                Sexo = dto.Sexo,
                PropietarioId = dto.PropietarioId
            };

            _context.Mascotas.Add(nuevaMascota);
            await _context.SaveChangesAsync();

            // Obtener nombre del propietario para devolverlo
            var propietario = await _context.Personas.FindAsync(dto.PropietarioId);

            dto.Id = nuevaMascota.Id;
            dto.NombrePropietario = propietario?.NombreCompleto;

            return CreatedAtAction(nameof(GetMascota), new { id = dto.Id }, dto);
        }

        // PUT: api/Mascotas/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMascota(int id, MascotaDTO dto)
        {
            if (id != dto.Id)
                return BadRequest();

            var mascotaExistente = await _context.Mascotas.FindAsync(id);
            if (mascotaExistente == null)
                return NotFound();

            mascotaExistente.Nombre = dto.Nombre;
            mascotaExistente.Especie = dto.Especie;
            mascotaExistente.Raza = dto.Raza;
            mascotaExistente.FechaNacimiento = dto.FechaNacimiento;
            mascotaExistente.Sexo = dto.Sexo;
            mascotaExistente.PropietarioId = dto.PropietarioId;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Mascotas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMascota(int id)
        {
            var mascota = await _context.Mascotas.FindAsync(id);
            if (mascota == null)
                return NotFound();

            _context.Mascotas.Remove(mascota);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MascotaExists(int id)
        {
            return _context.Mascotas.Any(e => e.Id == id);
        }
    }
}
