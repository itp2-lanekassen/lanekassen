namespace Lanekassen.Models;

public class SubjectField {
  public int SubjectFieldId { get; set; }
  public string Name { get; set; } = null!;
  public int DepartmentId { get; set; }
  public ICollection<User> Users { get; set; } = null!;
}
