namespace Lanekassen.Models;

public class AbsenceType {
  public int AbsenceTypeId { get; set; }
  public string Name { get; set; } = null!;
  public string Code { get; set; } = null!;
  public string ColorCode { get; set; } = null!;
  public List<Absence> Absences { get; set; } = null!;
}
