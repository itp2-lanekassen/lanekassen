namespace Lanekassen.Models.DTO;

public class SectionDTO {
  public string Name { get; set; } = "";
  public int DepartmentId { get; set; }
  public ICollection<int>? Users { get; set; }
}