namespace Lanekassen.Models.DTO;

public class DepartmentDTO {
  public string Name { get; set; } = "";
  public string Description { get; set; } = "";
  public ICollection<int> Sections { get; set; } = null!;
  public ICollection<int> SubjectFields { get; set; } = null!;

}