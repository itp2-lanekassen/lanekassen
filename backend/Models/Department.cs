namespace Lanekassen.Models;

public class Department {
  public int DepartmentId { get; set; }
  public string Name { get; set; } = null!;
  public string Abbreviation { get; set; } = null!;
  public List<SubjectField> SubjectFields { get; set; } = null!;
  public ICollection<Section> Sections { get; set; } = null!;
}
