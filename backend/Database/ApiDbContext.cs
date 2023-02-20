/* using Lanekassen.Models;
using Microsoft.EntityFrameworkCore;

namespace Lanekassen.Database;

public class ApiDbContext : DbContext {
  public ApiDbContext(DbContextOptions<ApiDbContext> options) : base(options) {}

  public DbSet<Absence> Absences { get; set; }
  public DbSet<AbsenceType> AbsenceTypes { get; set; }
  public DbSet<Department> Departments { get; set; }
  public DbSet<Role> Roles { get; set; }
  public DbSet<Section> Sections { get; set; }
  public DbSet<SubjectField> SubjectFields { get; set; }
  public DbSet<Team> Teams { get; set; } 
  public DbSet<User> Users { get; set; }

  protected override void OnModelCreating(ModelBuilder modelBuilder) {
    var department1 = new Department { DepartmentId = 696969, Name = "IT-avdelingen", Abbreviation = "IT" };
    var department2 = new Department { DepartmentId = 696970, Name = "Utdanningsstøtte", Abbreviation = "UA" };
    var department3 = new Department { DepartmentId = 696971, Name = "Saksavdelingen", Abbreviation = "SAK" };
    var department4 = new Department { DepartmentId = 696972, Name = "Styring og Økonomi", Abbreviation = "SØ" };
    var department5 = new Department { DepartmentId = 696973, Name = "Kommunikasjonsstaben", Abbreviation = "KOM" };
    var department6 = new Department { DepartmentId = 696974, Name = "HR og administrasjon", Abbreviation = "HR" };

    var subjectField1 = new { SubjectFieldId = 716969, Name = "Virksomhetsarkitektur og Prosjektledelse", DepartmentId = department1.DepartmentId };

    ICollection<Department> departments = new List<Department> { department1 };

    var section1 = new Section { SectionId = 706969, Name = "Trondheim" };
    var section2 = new Section { SectionId = 706970, Name = "Oslo" };
    var section3 = new Section { SectionId = 706971, Name = "Hjemmekollega" };

    var team1 = new Team { TeamId = 726969, Name = "Rubik" };

    var role1 = new Role { RoleId = 736969, Name = "Arkitekt" };

    _ = modelBuilder.Entity<User>(entity => {
      _ = entity
        .HasMany(user => user.Absences)
        .WithOne(absence => absence.User);

      _ = entity
        .HasMany(user => user.Teams)
        .WithMany(team => team.Users)
        .UsingEntity(j => {
          j.HasData(
            new { UsersUserId = 666969, TeamsTeamId = team1.TeamId }
          );
        });

      _ = entity
        .HasMany(user => user.Roles)
        .WithMany(role => role.Users)
        .UsingEntity(j => {
          j.HasData(
            new { UsersUserId = 666969, RolesRoleId = role1.RoleId }
          );
        });

      _ = entity
        .HasOne(user => user.Section)
        .WithMany(section => section.Users);

      _ = entity
        .HasMany(user => user.SubjectFields)
        .WithMany(subjectField => subjectField.Users)
        .UsingEntity(j => {
          j.HasData(
            new { UsersUserId = 666969, SubjectFieldsSubjectFieldId = subjectField1.SubjectFieldId }
          );
        });

        _ = entity.HasData(
          new {
            UserId = 666969,
            FirstName = "John",
            LastName = "Doe",
            Email = "john@doe.com",
            SectionId = section1.SectionId,
            Admin = false,
            EmploymentType = EmploymentType.Ansatt,
          }
        );
    });

    _ = modelBuilder.Entity<Department>(entity => {
      _ = entity
        .HasMany(department => department.Sections)
        .WithMany(section => section.Departments)
        .UsingEntity(j => {
          j.HasData(
            new { SectionsSectionId = section1.SectionId, DepartmentsDepartmentId = department1.DepartmentId },
            new { SectionsSectionId = section2.SectionId, DepartmentsDepartmentId = department1.DepartmentId },
            new { SectionsSectionId = section3.SectionId, DepartmentsDepartmentId = department1.DepartmentId }
          );
        });

      _ = entity
        .HasMany(department => department.SubjectFields)
        .WithOne(subjectField => subjectField.Department); 

      _ = entity.HasData(department1, department2, department3, department4, department5, department6);
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
        section1,
        section2,
        section3
      );
    });

    _ = modelBuilder.Entity<SubjectField>(entity => {
      _ = entity.HasData(
        subjectField1,
        new { SubjectFieldId = 716970, Name = "Applikasjonsdrift", DepartmentId = department1.DepartmentId },
        new { SubjectFieldId = 716971, Name = "Systemutvikling og test", DepartmentId = department1.DepartmentId },
        new { SubjectFieldId = 716972, Name = "Informasjonssikkerhet", DepartmentId = department1.DepartmentId },
        new { SubjectFieldId = 716973, Name = "Data og informasjonsforvaltning", DepartmentId = department1.DepartmentId },
        new { SubjectFieldId = 716974, Name = "Leverandørstyring og økonomi", DepartmentId = department1.DepartmentId },
        new { SubjectFieldId = 716975, Name = "Drift og avtaleeierskap", DepartmentId = department1.DepartmentId },
        new { SubjectFieldId = 716976, Name = "IT Brukerstøtte", DepartmentId = department1.DepartmentId },
        new { SubjectFieldId = 716977, Name = "Rekruttering og kompetanse", DepartmentId = department1.DepartmentId }
      );
    });

    _ = modelBuilder.Entity<Team>(entity => {
      _ = entity.HasData(
        team1,
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
        role1,
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
} */



using Lanekassen.Models;
using Microsoft.EntityFrameworkCore;

namespace Lanekassen.Database;

public class ApiDbContext : DbContext {
  public ApiDbContext(DbContextOptions<ApiDbContext> options) : base(options) {}

  public DbSet<Absence> Absences { get; set; }
  public DbSet<AbsenceType> AbsenceTypes { get; set; }
  public DbSet<Department> Departments { get; set; }
  public DbSet<Role> Roles { get; set; }
  public DbSet<Section> Sections { get; set; }
  public DbSet<SubjectField> SubjectFields { get; set; }
  public DbSet<Team> Teams { get; set; } 
  public DbSet<User> Users { get; set; }

  protected override void OnModelCreating(ModelBuilder modelBuilder) {
    var department1 = new Department { DepartmentId = 696969, Name = "IT-avdelingen", Abbreviation = "IT" };
    var department2 = new Department { DepartmentId = 696970, Name = "Utdanningsstøtte", Abbreviation = "UA" };
    var department3 = new Department { DepartmentId = 696971, Name = "Saksavdelingen", Abbreviation = "SAK" };
    var department4 = new Department { DepartmentId = 696972, Name = "Styring og Økonomi", Abbreviation = "SØ" };
    var department5 = new Department { DepartmentId = 696973, Name = "Kommunikasjonsstaben", Abbreviation = "KOM" };
    var department6 = new Department { DepartmentId = 696974, Name = "HR og administrasjon", Abbreviation = "HR" };

    var subjectField1 = new { SubjectFieldId = 716969, Name = "Virksomhetsarkitektur og Prosjektledelse", DepartmentId = department1.DepartmentId };

    ICollection<Department> departments = new List<Department> { department1 };

    var section1 = new Section { SectionId = 706969, Name = "Trondheim" };
    var section2 = new Section { SectionId = 706970, Name = "Oslo" };
    var section3 = new Section { SectionId = 706971, Name = "Hjemmekollega" };

    var team1 = new Team { TeamId = 726969, Name = "Rubik" };

    var role1 = new Role { RoleId = 736969, Name = "Arkitekt" };

    _ = modelBuilder.Entity<User>(entity => {
      _ = entity
        .HasMany(user => user.Absences)
        .WithOne(absence => absence.User);

      _ = entity
        .HasMany(user => user.Teams)
        .WithMany(team => team.Users)
        .UsingEntity(j => {
          j.HasData(
            new { UsersUserId = 666969, TeamsTeamId = team1.TeamId }
          );
        });

      _ = entity
        .HasMany(user => user.Roles)
        .WithMany(role => role.Users)
        .UsingEntity(j => {
          j.HasData(
            new { UsersUserId = 666969, RolesRoleId = role1.RoleId }
          );
        });

      _ = entity
        .HasOne(user => user.Section)
        .WithMany(section => section.Users);

      _ = entity
        .HasMany(user => user.SubjectFields)
        .WithMany(subjectField => subjectField.Users)
        .UsingEntity(j => {
          j.HasData(
            new { UsersUserId = 666969, SubjectFieldsSubjectFieldId = subjectField1.SubjectFieldId }
          );
        });

      _ = entity.HasData(
        new {
          UserId = 666969,
          FirstName = "John",
          LastName = "Doe",
          Email = "john@doe.com",
          SectionId = section1.SectionId,
          Admin = false,
          EmploymentType = EmploymentType.Ansatt,
        }
      );
    });

    _ = modelBuilder.Entity<Department>(entity => {
      _ = entity
        .HasMany(department => department.Sections)
        .WithMany(section => section.Departments)
        .UsingEntity(j => {
          j.HasData(
            new { SectionsSectionId = section1.SectionId, DepartmentsDepartmentId = department1.DepartmentId },
            new { SectionsSectionId = section2.SectionId, DepartmentsDepartmentId = department1.DepartmentId },
            new { SectionsSectionId = section3.SectionId, DepartmentsDepartmentId = department1.DepartmentId }
          );
        });

      _ = entity
        .HasMany(department => department.SubjectFields)
        .WithOne(subjectField => subjectField.Department); 

      _ = entity.HasData(department1, department2, department3, department4, department5, department6);
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
        section1,
        section2,
        section3
      );
    });

    _ = modelBuilder.Entity<SubjectField>(entity => {
      _ = entity.HasData(
        subjectField1,
        new { SubjectFieldId = 716970, Name = "Applikasjonsdrift", DepartmentId = department1.DepartmentId },
        new { SubjectFieldId = 716971, Name = "Systemutvikling og test", DepartmentId = department1.DepartmentId },
        new { SubjectFieldId = 716972, Name = "Informasjonssikkerhet", DepartmentId = department1.DepartmentId },
        new { SubjectFieldId = 716973, Name = "Data og informasjonsforvaltning", DepartmentId = department1.DepartmentId },
        new { SubjectFieldId = 716974, Name = "Leverandørstyring og økonomi", DepartmentId = department1.DepartmentId },
        new { SubjectFieldId = 716975, Name = "Drift og avtaleeierskap", DepartmentId = department1.DepartmentId },
        new { SubjectFieldId = 716976, Name = "IT Brukerstøtte", DepartmentId = department1.DepartmentId },
        new { SubjectFieldId = 716977, Name = "Rekruttering og kompetanse", DepartmentId = department1.DepartmentId }
      );
    });

    _ = modelBuilder.Entity<Team>(entity => {
      _ = entity.HasData(
        team1,
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
        role1,
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