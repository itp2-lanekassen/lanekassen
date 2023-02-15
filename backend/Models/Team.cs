namespace Lanekassen.Models;

public class Team {
  public int TeamId { get; set; }
  public string Name { get; set; } = "";
  public virtual ICollection<User>? Users { get; set; }
}
