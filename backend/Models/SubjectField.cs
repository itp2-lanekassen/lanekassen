namespace Lanekassen.Models;

public class SubjectField {
  public int SubjectFieldId { get; set; }
  public string Name { get; set; } = "";
  public virtual Department Department { get; set; }
  public virtual ICollection<User>? Users { get; set; }

}
