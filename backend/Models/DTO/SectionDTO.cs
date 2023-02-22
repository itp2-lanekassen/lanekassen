namespace Lanekassen.Models.DTO;

public class SectionDTO {
  public string Name { get; set; } = "";
  public string Description { get; set; } = "";
  public ICollection<int>? Users { get; set; }
  public ICollection<int> Departments { get; set; } = null!;
}