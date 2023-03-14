namespace Lanekassen.Models;

public class Department {
  public int DepartmentId { get; set; }
  public string Name { get; set; } = null!;
  public string Abbreviation { get; set; } = null!;
  public ICollection<SubjectField> SubjectFields { get; set; } = null!;
  public ICollection<Section> Sections { get; set; } = null!;
  public ICollection<Team> Teams { get; set; } = null!;
  public ICollection<Role> Roles { get; set; } = null!;
  public ICollection<User> Users { get; set; } = null!;
}
