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

      _ = entity.HasData(
        new Department { DepartmentId = 696969, Name = "IT-avdelingen", Abbreviation = "IT" },
        new Department { DepartmentId = 696970, Name = "Utdanningsstøtte", Abbreviation = "UA" },
        new Department { DepartmentId = 696971, Name = "Saksavdelingen", Abbreviation = "SAK" },
        new Department { DepartmentId = 696972, Name = "Styring og Økonomi", Abbreviation = "SØ" },
        new Department { DepartmentId = 696973, Name = "Kommunikasjonsstaben", Abbreviation = "KOM" },
        new Department { DepartmentId = 696974, Name = "HR og administrasjon", Abbreviation = "HR" }
      );
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

    _ = modelBuilder.Entity<Section>(entity => {
      _ = entity.HasData(
        new Section { SectionId = 706969, Name = "Trondheim" },
        new Section { SectionId = 706970, Name = "Oslo" },
        new Section { SectionId = 706971, Name = "Hjemmekollega" }
      );
    });

    _ = modelBuilder.Entity<SubjectField>(entity => {
      _ = entity.HasData(
        new { SubjectFieldId = 716969, Name = "Virksomhetsarkitektur og Prosjektledelse", DepartmentId = 696969 },
        new { SubjectFieldId = 716970, Name = "Applikasjonsdrift", DepartmentId = 696969 },
        new { SubjectFieldId = 716971, Name = "Systemutvikling og test", DepartmentId = 696969 },
        new { SubjectFieldId = 716972, Name = "Informasjonssikkerhet", DepartmentId = 696969 },
        new { SubjectFieldId = 716973, Name = "Data og informasjonsforvaltning", DepartmentId = 696969 },
        new { SubjectFieldId = 716974, Name = "Leverandørstyring og økonomi", DepartmentId = 696969 },
        new { SubjectFieldId = 716975, Name = "Drift og avtaleeierskap", DepartmentId = 696969 },
        new { SubjectFieldId = 716976, Name = "IT Brukerstøtte", DepartmentId = 696969 },
        new { SubjectFieldId = 716977, Name = "Rekruttering og kompetanse", DepartmentId = 696969 }
      );
    });

    _ = modelBuilder.Entity<Team>(entity => {
      _ = entity.HasData(
        new Team { TeamId = 726969, Name = "Rubik" },
        new Team { TeamId = 726970, Name = "Settlers" },
        new Team { TeamId = 726971, Name = "Dominion" },
        new Team { TeamId = 726972, Name = "Portal" },
        new Team { TeamId = 726973, Name = "Pong" },
        new Team { TeamId = 726974, Name = "Test" },
        new Team { TeamId = 726975, Name = "Ledergruppe IT" },
        new Team { TeamId = 726976, Name = "Utvidet Ledergruppe IT" }
      );
    });

    _ = modelBuilder.Entity<Role>(entity => {
      _ = entity.HasData(
        new Role { RoleId = 736969, Name = "Arkitekt" },
        new Role { RoleId = 736970, Name = "Prosjektleder" },
        new Role { RoleId = 736971, Name = "App.Drift" },
        new Role { RoleId = 736972, Name = "Teamlead" },
        new Role { RoleId = 736973, Name = "Tester" },
        new Role { RoleId = 736974, Name = "Utvikler" },
        new Role { RoleId = 736975, Name = "Designer" },
        new Role { RoleId = 736976, Name = "Controller" },
        new Role { RoleId = 736977, Name = "Leder" }
      );
    });

    _ = modelBuilder.Entity<AbsenceType>(entity => {
      _ = entity.HasData(
        new AbsenceType { AbsenceTypeId = 746969, Name = "Tilgjengelig fravær", Code = "T" },
        new AbsenceType { AbsenceTypeId = 746970, Name = "Utilgjengelig fravær", Code = "F" },
        new AbsenceType { AbsenceTypeId = 746971, Name = "Permisjon/Sykmelding", Code = "P/S" }
      );
    });

    base.OnModelCreating(modelBuilder);
  }
}
