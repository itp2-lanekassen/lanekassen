namespace Lanekassen.Models.DTO;

public class SubjectFieldDTO {
  public string Name { get; set; } = "";
  public ICollection<int> Departments { get; set; } = null!;
  public ICollection<int>? Users { get; set; }
}