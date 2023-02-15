using Lanekassen.Models;
using Microsoft.EntityFrameworkCore;

namespace Lanekassen.Database;

public class ApiDbContext : DbContext {
  public ApiDbContext(DbContextOptions<ApiDbContext> options) : base(options) {

  }

  protected override void OnModelCreating(ModelBuilder modelBuilder) {
    _ = modelBuilder.Entity<User>(entity => {
      _ = entity
        .HasMany(user => user.Absences)
        .WithOne(absence => absence.User);

      _ = entity
        .HasMany(user => user.Teams)
        .WithMany(team => team.Users);

      _ = entity
        .HasMany(user => user.Roles)
        .WithMany(role => role.Users);

      _ = entity
        .HasOne(user => user.Section)
        .WithMany(section => section.Users);

      _ = entity
        .HasMany(user => user.SubjectFields)
        .WithMany(subjectField => subjectField.Users);
    });

    _ = modelBuilder.Entity<Department>(entity => {
      _ = entity
        .HasMany(department => department.Sections)
        .WithMany(section => section.Departments);

      _ = entity
        .HasMany(department => department.SubjectFields)
        .WithOne(subjectField => subjectField.Department);
    });

    _ = modelBuilder.Entity<Absence>(entity => {
      _ = entity
        .HasOne(absence => absence.User)
        .WithMany(user => user.Absences)
        .OnDelete(DeleteBehavior.Cascade);

      _ = entity
        .HasOne(absence => absence.Type)
        .WithMany(type => type.Absences);
    });

    base.OnModelCreating(modelBuilder);
  }
}
