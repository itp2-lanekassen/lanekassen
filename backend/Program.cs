using System.Text.Json.Serialization;
using Lanekassen;
using Lanekassen.Database;
using Microsoft.EntityFrameworkCore;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

// env variables
string rootPath = Directory.GetCurrentDirectory();
string environmentVariablesFile = Path.Combine(rootPath, ".env");
SetEnvVar.SetVariables(environmentVariablesFile);

string host = Environment.GetEnvironmentVariable("LANEKASSEN_DB_HOST")!;
string username = Environment.GetEnvironmentVariable("LANEKASSEN_DB_USERNAME")!;
string password = Environment.GetEnvironmentVariable("LANEKASSEN_DB_PASSWORD")!;
string database = Environment.GetEnvironmentVariable("LANEKASSEN_DB_NAME")!;
string connectionString = $"Host={host};Username={username};Password={password};Database={database}";

IConfigurationRoot config =
    new ConfigurationBuilder()
        .AddEnvironmentVariables()
        .Build();



// Add services to the container.
// Register Api Controllers
builder.Services.AddControllers().AddJsonOptions(opt => {
  opt.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
  // Uncomment this to remove null values from response
  opt.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
});
// Add Swagger Services. Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ApiDbContext>(
  opt => opt
  .UseNpgsql(connectionString)
);

builder.Services.AddCors(options => {
  options.AddPolicy("AllowLocalhost",
      builder => {
        _ = builder
          .WithOrigins("http://localhost:3000")
          .AllowAnyHeader()
          .AllowAnyMethod()
          .AllowCredentials();
      });
});


WebApplication app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment()) {
  _ = app.UseSwagger();
  _ = app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Use CORS middleware
app.UseCors("AllowLocalhost");

app.UseAuthorization();

app.MapControllers();

app.Run();
