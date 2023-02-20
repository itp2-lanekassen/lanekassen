using System.ComponentModel.DataAnnotations.Schema;

namespace Lanekassen.Models;

[Table("AbsenceType")]
public class AbsenceType {
  public int AbsenceTypeId { get; set; }
  public string Name { get; set; } = "";
  public string Code { get; set; } = "";
  public string ColorCode { get; set; } = "";
  public virtual ICollection<Absence>? Absences { get; set; }
}
