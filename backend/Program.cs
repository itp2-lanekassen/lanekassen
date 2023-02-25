using System.Text.Json.Serialization;
using Lanekassen.Database;
using Microsoft.EntityFrameworkCore;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Register Api Controllers
builder.Services.AddControllers().AddJsonOptions(opt => {
  opt.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
  // Uncomment this to remove null values from response
  // opt.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
});
// Add Swagger Services. Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add Database context
builder.Services.AddDbContext<ApiDbContext>(
  opt => opt
  .UseNpgsql(builder.Configuration.GetConnectionString("LanekassenDB"))
  .EnableSensitiveDataLogging(true)
);

// Allow CORS from http://127.0.0.1:3000/
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins",
        builder => builder.AllowAnyOrigin() // AllowAnyOrigin() is not recommended for production
                          .AllowAnyHeader()
                          .AllowAnyMethod());
});


WebApplication app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment()) {
  _ = app.UseSwagger();
  _ = app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Use CORS middleware
app.UseCors("AllowAnyOrigin");

app.UseAuthorization();

app.MapControllers();



app.Run();
