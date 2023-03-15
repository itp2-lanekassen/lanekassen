namespace Lanekassen.Models;

public class Absence {
  public int AbsenceId { get; set; }
  public DateTime StartDate { get; set; }
  public DateTime EndDate { get; set; }
  public Boolean IsApproved { get; set; }
  public string? Comment { get; set; }
  public int UserId { get; set; }
  public User User { get; set; } = null!;
  // Optional Foreign key means absence is not deleted when absenceType is deleted
  public int? AbsenceTypeId { get; set; }
  public AbsenceType Type { get; set; } = null!;
}
