namespace Lanekassen.Models;

public class Department : BaseEntity {
  public string Name { get; set; } = "";
  public virtual ICollection<Section> Sections { get; set; }
  public virtual ICollection<SubjectField> SubjectFields { get; set; }
}
