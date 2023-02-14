using Microsoft.EntityFrameworkCore;

namespace Lanekassen.Database;

public class ApiDbContext : DbContext {
  public ApiDbContext(DbContextOptions<ApiDbContext> options) : base(options) {

  }
}