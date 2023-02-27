namespace Lanekassen.Models.DTO;

public class SubjectFieldDTO {
  public string Name { get; set; } = "";
  public int DepartmentId { get; set; }
  public ICollection<int>? Users { get; set; }
}