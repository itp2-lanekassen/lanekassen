namespace Lanekassen.Models;

public class Team {
  public int TeamId { get; set; }
  public string Name { get; set; } = null!;
  public ICollection<User> Users { get; set; } = null!;
  public ICollection<Department> Departments { get; set; } = null!;
  
}
