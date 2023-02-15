namespace Lanekassen.Models;

public class User {
  public int UserId { get; set; }
  public string FirstName { get; set; } = "";
  public string LastName { get; set; } = "";
  public string Email { get; set; } = "";
  public EmploymentType EmploymentType { get; set; } = EmploymentType.Ansatt;
  public bool Admin { get; set; }
  public virtual Section Section { get; set; }
  public virtual ICollection<SubjectField> SubjectFields { get; set; }
  public virtual ICollection<Role>? Roles { get; set; }
  public virtual ICollection<Team>? Teams { get; set; }
  public virtual ICollection<Absence>? Absences { get; set; }
}
