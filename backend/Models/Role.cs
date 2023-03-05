namespace Lanekassen.Models;

public class Role {
  public int RoleId { get; set; }
  public string Name { get; set; } = null!;
  public ICollection<User> Users { get; set; } = null!;
  public ICollection<Department> Departments { get; set; } = null!;
}
