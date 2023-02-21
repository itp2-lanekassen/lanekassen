namespace Lanekassen.Models;

public class Section {
  public int SectionId { get; set; }
  public string Name { get; set; } = null!;
  public List<User> Users { get; set; } = null!;
  public ICollection<Department> Departments { get; set; } = null!;
}
