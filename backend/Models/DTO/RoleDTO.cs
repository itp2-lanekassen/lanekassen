namespace Lanekassen.Models.DTO;

public class RoleDTO {
  public string Name { get; set; } = "";
  public ICollection<int> Departments { get; set; } = null!;
}