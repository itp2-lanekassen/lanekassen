using System.ComponentModel.DataAnnotations.Schema;

namespace Lanekassen.Models;

[Table("Section")]
public class Section {
  public int SectionId { get; set; }
  public string Name { get; set; } = "";
  public virtual ICollection<Department> Departments { get; set; }
  public virtual ICollection<User>? Users { get; set; }
}
