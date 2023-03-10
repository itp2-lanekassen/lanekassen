using System.ComponentModel.DataAnnotations.Schema;

namespace Lanekassen.Models;

public class User {
  public int UserId { get; set; }
  [Column(Order = 0)]
  public string AzureId { get; set; } = null!;
  public string FirstName { get; set; } = null!;
  [Column(Order = 1)]
  public string LastName { get; set; } = null!;
  public string Email { get; set; } = null!;
  public EmploymentType EmploymentType { get; set; } = EmploymentType.Ansatt;
  public bool Admin { get; set; }
  // Optional foreign key means user is not deleted when section is deleted
  public int? SectionId { get; set; }
  public Section Section { get; set; } = null!;
  public List<Absence> Absences { get; set; } = null!;
  public ICollection<SubjectField> SubjectFields { get; set; } = null!;
  public ICollection<Role> Roles { get; set; } = null!;
  public ICollection<Team> Teams { get; set; } = null!;
  public Department Department { get; set; } = null!;
  public int? DepartmentId { get; set; }
}
