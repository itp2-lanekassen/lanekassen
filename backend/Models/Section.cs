namespace Lanekassen.Models;

public class Section {
  public int SectionId { get; set; }
  public string Name { get; set; } = "";
  public virtual ICollection<Department> Departments { get; set; }
  public virtual ICollection<User>? Users { get; set; }
}
