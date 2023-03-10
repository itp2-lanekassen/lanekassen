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
    Department department1 = new() { DepartmentId = 696969, Name = "IT-avdelingen", Abbreviation = "IT" };

    SubjectField subjectField1 = new() { SubjectFieldId = 716969, Name = "Virksomhetsarkitektur og Prosjektledelse", DepartmentId = department1.DepartmentId };

    Section section1 = new() { SectionId = 706969, Name = "Trondheim" };

    Team team1 = new() { TeamId = 726969, Name = "Rubik" };

    Role role1 = new() { RoleId = 736969, Name = "Arkitekt" };

    _ = modelBuilder.Entity<Department>(e => {
      _ = e
        .HasMany(department => department.Sections)
        .WithMany(section => section.Departments)
        .UsingEntity(j => j.HasData(
            new { SectionsSectionId = section1.SectionId, DepartmentsDepartmentId = department1.DepartmentId },
            new { SectionsSectionId = 706970, DepartmentsDepartmentId = department1.DepartmentId },
            new { SectionsSectionId = 706971, DepartmentsDepartmentId = department1.DepartmentId }
          ));
      _ = e
        .HasMany(department => department.Teams)
        .WithMany(team => team.Departments)
        .UsingEntity(j => j.HasData(
          new { TeamsTeamId = team1.TeamId, DepartmentsDepartmentId = department1.DepartmentId },
          new { TeamsTeamId = 726970, DepartmentsDepartmentId = department1.DepartmentId },
          new { TeamsTeamId = 726971, DepartmentsDepartmentId = department1.DepartmentId },
          new { TeamsTeamId = 726972, DepartmentsDepartmentId = department1.DepartmentId },
          new { TeamsTeamId = 726973, DepartmentsDepartmentId = department1.DepartmentId },
          new { TeamsTeamId = 726974, DepartmentsDepartmentId = department1.DepartmentId },
          new { TeamsTeamId = 726975, DepartmentsDepartmentId = department1.DepartmentId },
          new { TeamsTeamId = 726976, DepartmentsDepartmentId = department1.DepartmentId }
        ));

      _ = e
        .HasMany(department => department.Roles)
        .WithMany(role => role.Departments)
        .UsingEntity(j => j.HasData(
            new { RolesRoleId = role1.RoleId, DepartmentsDepartmentId = department1.DepartmentId },
            new { RolesRoleId = 736970, DepartmentsDepartmentId = department1.DepartmentId },
            new { RolesRoleId = 736971, DepartmentsDepartmentId = department1.DepartmentId },
            new { RolesRoleId = 736972, DepartmentsDepartmentId = department1.DepartmentId },
            new { RolesRoleId = 736973, DepartmentsDepartmentId = department1.DepartmentId },
            new { RolesRoleId = 736974, DepartmentsDepartmentId = department1.DepartmentId },
            new { RolesRoleId = 736975, DepartmentsDepartmentId = department1.DepartmentId },
            new { RolesRoleId = 736976, DepartmentsDepartmentId = department1.DepartmentId },
            new { RolesRoleId = 736977, DepartmentsDepartmentId = department1.DepartmentId }
          ));

      _ = e.HasData(
        department1,
        new() { DepartmentId = 696970, Name = "Utdanningsstøtte", Abbreviation = "UA" },
        new() { DepartmentId = 696971, Name = "Saksavdelingen", Abbreviation = "SAK" },
        new() { DepartmentId = 696972, Name = "Styring og Økonomi", Abbreviation = "SØ" },
        new() { DepartmentId = 696973, Name = "Kommunikasjonsstaben", Abbreviation = "KOM" },
        new() { DepartmentId = 696974, Name = "HR og administrasjon", Abbreviation = "HR" }
      );
    });



    _ = modelBuilder.Entity<Section>().HasData(
      section1,
      new() { SectionId = 706970, Name = "Oslo" },
      new() { SectionId = 706971, Name = "Hjemmekollega" }
    );


    _ = modelBuilder.Entity<SubjectField>().HasData(
      subjectField1,
      new SubjectField { SubjectFieldId = 716970, Name = "Applikasjonsdrift", DepartmentId = department1.DepartmentId },
      new SubjectField { SubjectFieldId = 716971, Name = "Systemutvikling og test", DepartmentId = department1.DepartmentId },
      new SubjectField { SubjectFieldId = 716972, Name = "Informasjonssikkerhet", DepartmentId = department1.DepartmentId },
      new SubjectField { SubjectFieldId = 716973, Name = "Data og informasjonsforvaltning", DepartmentId = department1.DepartmentId },
      new SubjectField { SubjectFieldId = 716974, Name = "Leverandørstyring og økonomi", DepartmentId = department1.DepartmentId },
      new SubjectField { SubjectFieldId = 716975, Name = "Drift og avtaleeierskap", DepartmentId = department1.DepartmentId },
      new SubjectField { SubjectFieldId = 716976, Name = "IT Brukerstøtte", DepartmentId = department1.DepartmentId },
      new SubjectField { SubjectFieldId = 716977, Name = "Rekruttering og kompetanse", DepartmentId = department1.DepartmentId }
    );

    _ = modelBuilder.Entity<User>(e => {
      _ = e.HasData(
        new {
          UserId = 666969,
          AzureId = "This-is-a-fake-azure-id",
          FirstName = "John",
          LastName = "Doe",
          Email = "john@doe.com",
          section1.SectionId,
          Admin = false,
          EmploymentType = EmploymentType.Ansatt,
          department1.DepartmentId,
        }
      );

      _ = e
        .HasMany(user => user.Teams)
        .WithMany(team => team.Users)
        .UsingEntity(j => j.HasData(
          new { UsersUserId = 666969, TeamsTeamId = team1.TeamId }
        ));


      _ = e
        .HasMany(user => user.Roles)
        .WithMany(role => role.Users)
        .UsingEntity(j => j.HasData(
          new { UsersUserId = 666969, RolesRoleId = role1.RoleId }
        ));

      _ = e
        .HasMany(user => user.SubjectFields)
        .WithMany(subjectField => subjectField.Users)
        .UsingEntity(j => j.HasData(
          new { UsersUserId = 666969, SubjectFieldsSubjectFieldId = subjectField1.SubjectFieldId }
        ));

    });

    _ = modelBuilder.Entity<Team>().HasData(
      team1,
      new Team { TeamId = 726970, Name = "Settlers" },
      new Team { TeamId = 726971, Name = "Dominion" },
      new Team { TeamId = 726972, Name = "Portal" },
      new Team { TeamId = 726973, Name = "Pong" },
      new Team { TeamId = 726974, Name = "Test" },
      new Team { TeamId = 726975, Name = "Ledergruppe IT" },
      new Team { TeamId = 726976, Name = "Utvidet Ledergruppe IT" }
    );

    _ = modelBuilder.Entity<Role>().HasData(
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

    _ = modelBuilder.Entity<AbsenceType>().HasData(
      new AbsenceType { AbsenceTypeId = 746969, Name = "Tilgjengelig fravær", Code = "T", ColorCode = "#bada55" },
      new AbsenceType { AbsenceTypeId = 746970, Name = "Utilgjengelig fravær", Code = "F", ColorCode = "#bada55" },
      new AbsenceType { AbsenceTypeId = 746971, Name = "Permisjon/Sykmelding", Code = "P/S", ColorCode = "#bada55" }
    );

    _ = modelBuilder.Entity<Absence>().HasData(
      new Absence { AbsenceId = 756969, StartDate = new DateTime().ToUniversalTime(), EndDate = new DateTime().ToUniversalTime().AddDays(2), UserId = 666969, AbsenceTypeId = 746969 }
    );
  }
}