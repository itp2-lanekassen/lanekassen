namespace Lanekassen.Models.DTO;

public class TeamDTO {
  public string Name { get; set; } = "";
  public ICollection<int>? Users { get; set; }
  public ICollection<int> Departments { get; set; } = null!;
}