using Lanekassen.Models;
using Microsoft.EntityFrameworkCore;

namespace Lanekassen.Database;

public class ApiDbContext : DbContext {
  public DbSet<Absence> Absences => Set<Absence>();
  public DbSet<AbsenceType> AbsenceTypes => Set<AbsenceType>();
  public DbSet<Department> Departments => Set<Department>();
  public DbSet<Role> Roles => Set<Role>();
  public DbSet<Section> Sections => Set<Section>();
  public DbSet<SubjectField> SubjectFields => Set<SubjectField>();
  public DbSet<Team> Teams => Set<Team>();
  public DbSet<User> Users => Set<User>();

  public ApiDbContext(DbContextOptions<ApiDbContext> options) : base(options) {

  }

  protected override void OnModelCreating(ModelBuilder modelBuilder) {
    Department department1 = new() { DepartmentId = 1, Name = "IT-avdelingen", Abbreviation = "IT" };

    SubjectField subjectField1 = new() { SubjectFieldId = 1, Name = "Virksomhetsarkitektur og Prosjektledelse", DepartmentId = department1.DepartmentId };

    Section section1 = new() { SectionId = 1, Name = "Trondheim" };

    Team team1 = new() { TeamId = 1, Name = "Rubik" };

    Role role1 = new() { RoleId = 1, Name = "Arkitekt" };

    _ = modelBuilder.Entity<Department>(e => {
      _ = e
        .HasMany(department => department.Sections)
        .WithMany(section => section.Departments)
        .UsingEntity(j => j.HasData(
            new { SectionsSectionId = section1.SectionId, DepartmentsDepartmentId = department1.DepartmentId },
            new { SectionsSectionId = 2, DepartmentsDepartmentId = department1.DepartmentId },
            new { SectionsSectionId = 3, DepartmentsDepartmentId = department1.DepartmentId }
          ));
      _ = e
        .HasMany(department => department.Teams)
        .WithMany(team => team.Departments)
        .UsingEntity(j => j.HasData(
          new { TeamsTeamId = team1.TeamId, DepartmentsDepartmentId = department1.DepartmentId },
          new { TeamsTeamId = 2, DepartmentsDepartmentId = department1.DepartmentId },
          new { TeamsTeamId = 3, DepartmentsDepartmentId = department1.DepartmentId },
          new { TeamsTeamId = 4, DepartmentsDepartmentId = department1.DepartmentId },
          new { TeamsTeamId = 5, DepartmentsDepartmentId = department1.DepartmentId },
          new { TeamsTeamId = 6, DepartmentsDepartmentId = department1.DepartmentId },
          new { TeamsTeamId = 7, DepartmentsDepartmentId = department1.DepartmentId },
          new { TeamsTeamId = 8, DepartmentsDepartmentId = department1.DepartmentId }
        ));

      _ = e
        .HasMany(department => department.Roles)
        .WithMany(role => role.Departments)
        .UsingEntity(j => j.HasData(
            new { RolesRoleId = role1.RoleId, DepartmentsDepartmentId = department1.DepartmentId },
            new { RolesRoleId = 2, DepartmentsDepartmentId = department1.DepartmentId },
            new { RolesRoleId = 3, DepartmentsDepartmentId = department1.DepartmentId },
            new { RolesRoleId = 4, DepartmentsDepartmentId = department1.DepartmentId },
            new { RolesRoleId = 5, DepartmentsDepartmentId = department1.DepartmentId },
            new { RolesRoleId = 6, DepartmentsDepartmentId = department1.DepartmentId },
            new { RolesRoleId = 7, DepartmentsDepartmentId = department1.DepartmentId },
            new { RolesRoleId = 8, DepartmentsDepartmentId = department1.DepartmentId },
            new { RolesRoleId = 9, DepartmentsDepartmentId = department1.DepartmentId }
          ));

      _ = e.HasData(
        department1,
        new() { DepartmentId = 2, Name = "Utdanningsstøtte", Abbreviation = "UA" },
        new() { DepartmentId = 3, Name = "Saksavdelingen", Abbreviation = "SAK" },
        new() { DepartmentId = 4, Name = "Styring og Økonomi", Abbreviation = "SØ" },
        new() { DepartmentId = 5, Name = "Kommunikasjonsstaben", Abbreviation = "KOM" },
        new() { DepartmentId = 6, Name = "HR og administrasjon", Abbreviation = "HR" }
      );
    });



    _ = modelBuilder.Entity<Section>().HasData(
      section1,
      new() { SectionId = 2, Name = "Oslo" },
      new() { SectionId = 3, Name = "Hjemmekollega" }
    );


    _ = modelBuilder.Entity<SubjectField>().HasData(
      subjectField1,
      new SubjectField { SubjectFieldId = 2, Name = "Applikasjonsdrift", DepartmentId = department1.DepartmentId },
      new SubjectField { SubjectFieldId = 3, Name = "Systemutvikling og test", DepartmentId = department1.DepartmentId },
      new SubjectField { SubjectFieldId = 4, Name = "Informasjonssikkerhet", DepartmentId = department1.DepartmentId },
      new SubjectField { SubjectFieldId = 5, Name = "Data og informasjonsforvaltning", DepartmentId = department1.DepartmentId },
      new SubjectField { SubjectFieldId = 6, Name = "Leverandørstyring og økonomi", DepartmentId = department1.DepartmentId },
      new SubjectField { SubjectFieldId = 7, Name = "Drift og avtaleeierskap", DepartmentId = department1.DepartmentId },
      new SubjectField { SubjectFieldId = 8, Name = "IT Brukerstøtte", DepartmentId = department1.DepartmentId },
      new SubjectField { SubjectFieldId = 9, Name = "Rekruttering og kompetanse", DepartmentId = department1.DepartmentId }
    );

    _ = modelBuilder.Entity<User>(e => {
      _ = e.HasData(
        new {
          UserId = 1,
          AzureId = "Falsk-azure-id",
          FirstName = "Ola",
          LastName = "Nordmann",
          Email = "ola@nordmann.no",
          section1.SectionId,
          Admin = false,
          BusinessAffiliation = "Lånekassen",
          EmploymentType = EmploymentType.Ansatt,
          department1.DepartmentId,
        }
      );

      _ = e
        .HasMany(user => user.Teams)
        .WithMany(team => team.Users)
        .UsingEntity(j => j.HasData(
          new { UsersUserId = 1, TeamsTeamId = team1.TeamId }
        ));


      _ = e
        .HasMany(user => user.Roles)
        .WithMany(role => role.Users)
        .UsingEntity(j => j.HasData(
          new { UsersUserId = 1, RolesRoleId = role1.RoleId }
        ));

      _ = e
        .HasMany(user => user.SubjectFields)
        .WithMany(subjectField => subjectField.Users)
        .UsingEntity(j => j.HasData(
          new { UsersUserId = 1, SubjectFieldsSubjectFieldId = subjectField1.SubjectFieldId }
        ));

    });

    _ = modelBuilder.Entity<Team>().HasData(
      team1,
      new Team { TeamId = 2, Name = "Settlers" },
      new Team { TeamId = 3, Name = "Dominion" },
      new Team { TeamId = 4, Name = "Portal" },
      new Team { TeamId = 5, Name = "Pong" },
      new Team { TeamId = 6, Name = "Test" },
      new Team { TeamId = 7, Name = "Ledergruppe IT" },
      new Team { TeamId = 8, Name = "Utvidet Ledergruppe IT" }
    );

    _ = modelBuilder.Entity<Role>().HasData(
      role1,
      new Role { RoleId = 2, Name = "Prosjektleder" },
      new Role { RoleId = 3, Name = "App.Drift" },
      new Role { RoleId = 4, Name = "Teamlead" },
      new Role { RoleId = 5, Name = "Tester" },
      new Role { RoleId = 6, Name = "Utvikler" },
      new Role { RoleId = 7, Name = "Designer" },
      new Role { RoleId = 8, Name = "Controller" },
      new Role { RoleId = 9, Name = "Leder" }
    );

    _ = modelBuilder.Entity<AbsenceType>().HasData(
      new AbsenceType { AbsenceTypeId = 1, Name = "Tilgjengelig fravær", Code = "T", ColorCode = "#00b500" },
      new AbsenceType { AbsenceTypeId = 2, Name = "Utilgjengelig fravær", Code = "F", ColorCode = "#d90404" },
      new AbsenceType { AbsenceTypeId = 3, Name = "Permisjon/Sykmelding", Code = "P/S", ColorCode = "#eb9900" }
    );

    _ = modelBuilder.Entity<Absence>().HasData(
      new Absence { AbsenceId = 1, StartDate = new DateTime().ToUniversalTime(), EndDate = new DateTime().ToUniversalTime().AddDays(2), IsApproved = true, UserId = 1, AbsenceTypeId = 1 }
    );
  }
}