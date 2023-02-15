namespace Lanekassen.Models;

public class Department {
  public int DepartmentId { get; set; }
  public string Name { get; set; } = "";
  public string Abbreviation { get; set; } = "";
  public virtual ICollection<Section> Sections { get; set; }
  public virtual ICollection<SubjectField> SubjectFields { get; set; }
}
