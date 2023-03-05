namespace Lanekassen.Models.DTO;

public class DepartmentDTO {
  public string Name { get; set; } = "";
  public string Abbreviation { get; set; } = null!;
  public ICollection<int> Sections { get; set; } = null!;
  public ICollection<int> SubjectFields { get; set; } = null!;
  public ICollection<int> Teams { get; set; } = null!;
  public ICollection<int> Roles { get; set; } = null!;

}