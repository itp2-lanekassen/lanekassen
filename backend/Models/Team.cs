namespace Lanekassen.Models;

public class Team : BaseEntity {
  public string Name { get; set; } = "";
  public virtual ICollection<User>? Users { get; set; }
}
