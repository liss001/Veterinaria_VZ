using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using VeterinariaAPI.Models;

var builder = WebApplication.CreateBuilder(args);

// 🔐 Leer clave secreta JWT desde appsettings.json
var key = builder.Configuration["Jwt:Key"] ?? throw new Exception("JWT key not found in configuration");

// 💾 Configuración de DbContext
builder.Services.AddDbContext<VeterinariaContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("VeterinariaDb")));

// 🔐 Configuración de autenticación JWT
builder.Services.AddAuthentication("Bearer")
    .AddJwtBearer("Bearer", options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key))
        };
    });

// 🔐 Autorización por roles
builder.Services.AddAuthorization();

// ✅ Controladores con manejo de referencias cíclicas en JSON
builder.Services.AddControllers()
    .AddJsonOptions(options =>
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles);

// 🌐 Configuración de CORS (para React)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// 🧪 Swagger (solo en desarrollo)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// 🛠 Middleware de desarrollo
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// 🔐 Middleware del pipeline
app.UseHttpsRedirection();
app.UseCors("AllowReactApp");
app.UseAuthentication();  // debe ir antes que UseAuthorization
app.UseAuthorization();

app.MapControllers();

app.Run();
