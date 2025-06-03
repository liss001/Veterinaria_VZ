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
    public class PersonasController : ControllerBase
    {
        private readonly VeterinariaContext _context;

        public PersonasController(VeterinariaContext context)
        {
            _context = context;
        }

        // GET: api/Personas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PersonaDTO>>> GetPersonas()
        {
            var personas = await _context.Personas
                .Select(p => new PersonaDTO
                {
                    Id = p.Id,
                    NombreCompleto = p.NombreCompleto,
                    Telefono = p.Telefono,
                    Email = p.Email,
                    Direccion = p.Direccion,
                    TipoPersona = p.TipoPersona
                }).ToListAsync();

            return Ok(personas);
        }

        // GET: api/Personas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PersonaDTO>> GetPersona(int id)
        {
            var persona = await _context.Personas
                .Where(p => p.Id == id)
                .Select(p => new PersonaDTO
                {
                    Id = p.Id,
                    NombreCompleto = p.NombreCompleto,
                    Telefono = p.Telefono,
                    Email = p.Email,
                    Direccion = p.Direccion,
                    TipoPersona = p.TipoPersona
                }).FirstOrDefaultAsync();

            if (persona == null)
                return NotFound();

            return Ok(persona);
        }

        // POST: api/Personas
        [HttpPost]
        public async Task<ActionResult<PersonaDTO>> PostPersona(PersonaDTO personaDto)
        {
            var persona = new Persona
            {
                NombreCompleto = personaDto.NombreCompleto,
                Telefono = personaDto.Telefono,
                Email = personaDto.Email,
                Direccion = personaDto.Direccion,
                TipoPersona = personaDto.TipoPersona
            };

            _context.Personas.Add(persona);
            await _context.SaveChangesAsync();

            personaDto.Id = persona.Id;

            return CreatedAtAction(nameof(GetPersona), new { id = persona.Id }, personaDto);
        }

        // PUT: api/Personas/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPersona(int id, PersonaDTO personaDto)
        {
            if (id != personaDto.Id)
                return BadRequest("El ID no coincide con el DTO");

            var persona = await _context.Personas.FindAsync(id);

            if (persona == null)
                return NotFound();

            persona.NombreCompleto = personaDto.NombreCompleto;
            persona.Telefono = personaDto.Telefono;
            persona.Email = personaDto.Email;
            persona.Direccion = personaDto.Direccion;
            persona.TipoPersona = personaDto.TipoPersona;

            _context.Entry(persona).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PersonaExists(id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        // DELETE: api/Personas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePersona(int id)
        {
            var persona = await _context.Personas.FindAsync(id);
            if (persona == null)
                return NotFound();

            _context.Personas.Remove(persona);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PersonaExists(int id)
        {
            return _context.Personas.Any(e => e.Id == id);
        }
    }
}
