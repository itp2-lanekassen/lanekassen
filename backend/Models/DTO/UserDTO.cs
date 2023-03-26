namespace Lanekassen.Models.DTO;


public class UserDTO {
  public string AzureId { get; set; } = "";
  public string FirstName { get; set; } = "";
  public string LastName { get; set; } = "";
  public string Email { get; set; } = "";
  public EmploymentType EmploymentType { get; set; } = EmploymentType.Ansatt;
  public bool Admin { get; set; }
  public string BusinessAffiliation { get; set; } = "";
  public int SectionId { get; set; }
  public ICollection<int> SubjectFields { get; set; } = null!;
  public ICollection<int>? Roles { get; set; }
  public ICollection<int>? Teams { get; set; }
  public ICollection<int>? Absences { get; set; }
  public int DepartmentId { get; set; }
}