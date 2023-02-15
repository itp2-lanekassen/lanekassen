namespace Lanekassen.Models;

public class User : BaseEntity {
  public string FirstName { get; set; } = "";
  public string LastName { get; set; } = "";
  public string Email { get; set; } = "";
  public string EmploymentType { get; set; } = "";
  public bool Admin { get; set; }
  public virtual Role Role { get; set; }
  public virtual Team Team { get; set; }
  public virtual Section Section { get; set; }
  public virtual SubjectField SubjectField { get; set; }
}