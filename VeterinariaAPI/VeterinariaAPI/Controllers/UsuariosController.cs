using BCrypt.Net; // Si estás usando BCrypt.Net-Next
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using VeterinariaAPI.DTOs;
using VeterinariaAPI.Models; // Asegúrate de tener tu modelo Usuario aquí

namespace VeterinariaAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuariosController : ControllerBase
    {
        private readonly VeterinariaContext _context;

        public UsuariosController(VeterinariaContext context)
        {
            _context = context;
        }

        // POST: api/Usuarios/login
        [HttpPost("login")]
        public async Task<ActionResult<UsuarioDTO>> Login([FromBody] LoginDTO dto) // <- ¡IMPORTANTE!
        {
            var usuario = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.NombreUsuario == dto.NombreUsuario);

            if (usuario == null)
                return Unauthorized("Usuario no encontrado");

            bool contraseñaValida = BCrypt.Net.BCrypt.Verify(dto.Contraseña, usuario.Contraseña);
            if (!contraseñaValida)
                return Unauthorized("Contraseña incorrecta");

            return Ok(new UsuarioDTO
            {
                Id = usuario.Id,
                NombreUsuario = usuario.NombreUsuario,
                Rol = usuario.Rol
            });
        }

        // POST: api/Usuarios/registro
        [HttpPost("registro")]
        public async Task<IActionResult> Registrar([FromBody] Usuario usuario)
        {
            usuario.Contraseña = BCrypt.Net.BCrypt.HashPassword(usuario.Contraseña);
            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();
            return Ok("Usuario registrado");
        }
    }
}
