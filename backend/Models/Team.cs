using System.ComponentModel.DataAnnotations.Schema;

namespace Lanekassen.Models;

[Table("Team")]
public class Team {
  public int TeamId { get; set; }
  public string Name { get; set; } = "";
  public virtual ICollection<User>? Users { get; set; }
}
