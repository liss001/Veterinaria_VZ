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
    public class ProductosController : ControllerBase
    {
        private readonly VeterinariaContext _context;

        public ProductosController(VeterinariaContext context)
        {
            _context = context;
        }

        // GET: api/Productos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductoDTO>>> GetProductos()
        {
            var productos = await _context.Productos
                .Select(p => new ProductoDTO
                {
                    Id = p.Id,
                    Nombre = p.Nombre,
                    Categoria = p.Categoria,
                    Stock = p.Stock,
                    Precio = p.Precio
                })
                .ToListAsync();

            return Ok(productos);
        }

        // GET: api/Productos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductoDTO>> GetProducto(int id)
        {
            var producto = await _context.Productos
                .Where(p => p.Id == id)
                .Select(p => new ProductoDTO
                {
                    Id = p.Id,
                    Nombre = p.Nombre,
                    Categoria = p.Categoria,
                    Stock = p.Stock,
                    Precio = p.Precio
                })
                .FirstOrDefaultAsync();

            if (producto == null)
                return NotFound();

            return Ok(producto);
        }

        // PUT: api/Productos/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProducto(int id, ProductoDTO dto)
        {
            if (id != dto.Id)
                return BadRequest("El id no coincide con el DTO");

            var producto = await _context.Productos.FindAsync(id);
            if (producto == null)
                return NotFound();

            producto.Nombre = dto.Nombre;
            producto.Categoria = dto.Categoria;
            producto.Stock = dto.Stock;
            producto.Precio = dto.Precio;

            _context.Entry(producto).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductoExists(id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        // POST: api/Productos
        [HttpPost]
        public async Task<ActionResult<ProductoDTO>> PostProducto(ProductoDTO dto)
        {
            var producto = new Producto
            {
                Nombre = dto.Nombre,
                Categoria = dto.Categoria,
                Stock = dto.Stock,
                Precio = dto.Precio
            };

            _context.Productos.Add(producto);
            await _context.SaveChangesAsync();

            dto.Id = producto.Id;

            return CreatedAtAction(nameof(GetProducto), new { id = producto.Id }, dto);
        }

        // DELETE: api/Productos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProducto(int id)
        {
            var producto = await _context.Productos.FindAsync(id);
            if (producto == null)
                return NotFound();

            _context.Productos.Remove(producto);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductoExists(int id)
        {
            return _context.Productos.Any(e => e.Id == id);
        }
    }
}
