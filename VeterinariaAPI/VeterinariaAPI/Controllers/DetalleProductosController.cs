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
    public class DetalleProductosController : ControllerBase
    {
        private readonly VeterinariaContext _context;

        public DetalleProductosController(VeterinariaContext context)
        {
            _context = context;
        }

        // GET: api/DetalleProductos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DetalleProductoDTO>>> GetDetalleProductos()
        {
            var detalles = await _context.DetalleProductos
                .Include(dp => dp.Producto)
                .Select(dp => new DetalleProductoDTO
                {
                    Id = dp.Id,
                    ProductoId = dp.ProductoId,
                    NombreProducto = dp.Producto != null ? dp.Producto.Nombre : null,
                    Cantidad = dp.Cantidad,
                    TipoMovimiento = dp.TipoMovimiento,
                    FechaMovimiento = dp.FechaMovimiento
                })
                .ToListAsync();

            return Ok(detalles);
        }

        // GET: api/DetalleProductos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DetalleProductoDTO>> GetDetalleProducto(int id)
        {
            var detalle = await _context.DetalleProductos
                .Include(dp => dp.Producto)
                .Where(dp => dp.Id == id)
                .Select(dp => new DetalleProductoDTO
                {
                    Id = dp.Id,
                    ProductoId = dp.ProductoId,
                    NombreProducto = dp.Producto != null ? dp.Producto.Nombre : null,
                    Cantidad = dp.Cantidad,
                    TipoMovimiento = dp.TipoMovimiento,
                    FechaMovimiento = dp.FechaMovimiento
                })
                .FirstOrDefaultAsync();

            if (detalle == null)
                return NotFound();

            return Ok(detalle);
        }

        // GET: api/DetalleProductos/producto/5
        [HttpGet("producto/{productoId}")]
        public async Task<ActionResult<IEnumerable<DetalleProductoDTO>>> GetMovimientosPorProducto(int productoId)
        {
            var movimientos = await _context.DetalleProductos
                .Include(dp => dp.Producto)
                .Where(dp => dp.ProductoId == productoId)
                .Select(dp => new DetalleProductoDTO
                {
                    Id = dp.Id,
                    ProductoId = dp.ProductoId,
                    NombreProducto = dp.Producto != null ? dp.Producto.Nombre : null,
                    Cantidad = dp.Cantidad,
                    TipoMovimiento = dp.TipoMovimiento,
                    FechaMovimiento = dp.FechaMovimiento
                })
                .ToListAsync();

            if (movimientos == null || movimientos.Count == 0)
                return NotFound();

            return Ok(movimientos);
        }

        // PUT: api/DetalleProductos/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDetalleProducto(int id, DetalleProductoDTO dto)
        {
            if (id != dto.Id)
                return BadRequest("El id no coincide con el DTO");

            var detalle = await _context.DetalleProductos.FindAsync(id);
            if (detalle == null)
                return NotFound();

            detalle.ProductoId = dto.ProductoId;
            detalle.Cantidad = dto.Cantidad;
            detalle.TipoMovimiento = dto.TipoMovimiento;
            detalle.FechaMovimiento = dto.FechaMovimiento;

            _context.Entry(detalle).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DetalleProductoExists(id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        // POST: api/DetalleProductos
        [HttpPost]
        public async Task<ActionResult<DetalleProductoDTO>> PostDetalleProducto(DetalleProductoDTO dto)
        {
            var detalle = new DetalleProducto
            {
                ProductoId = dto.ProductoId,
                Cantidad = dto.Cantidad,
                TipoMovimiento = dto.TipoMovimiento,
                FechaMovimiento = dto.FechaMovimiento
            };

            _context.DetalleProductos.Add(detalle);
            await _context.SaveChangesAsync();

            dto.Id = detalle.Id;

            return CreatedAtAction(nameof(GetDetalleProducto), new { id = detalle.Id }, dto);
        }

        // DELETE: api/DetalleProductos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDetalleProducto(int id)
        {
            var detalle = await _context.DetalleProductos.FindAsync(id);
            if (detalle == null)
                return NotFound();

            _context.DetalleProductos.Remove(detalle);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DetalleProductoExists(int id)
        {
            return _context.DetalleProductos.Any(e => e.Id == id);
        }
    }
}
