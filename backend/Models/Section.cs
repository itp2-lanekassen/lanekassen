namespace Lanekassen.Models;

public class Section {
  public int SectionId { get; set; }
  public string Name { get; set; } = null!;
  public int DepartmentId { get; set; }
  public Department? Department { get; set; }
  public List<User> Users { get; set; } = null!;

}
