namespace Lanekassen.Models;

public class Absence : BaseEntity {
  public DateTime StartDate { get; set; }
  public DateTime EndDate { get; set; }
  public string? Comment { get; set; }
  public virtual AbsenceType Type { get; set; }
  public virtual User User { get; set; }
}
