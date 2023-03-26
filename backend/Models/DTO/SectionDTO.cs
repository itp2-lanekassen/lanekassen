namespace Lanekassen.Models.DTO;

public class SectionDTO {
  public string Name { get; set; } = "";
  public ICollection<int> Departments { get; set; } = null!;
}