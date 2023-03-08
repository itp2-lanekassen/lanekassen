namespace Lanekassen.Models.DTO;

public class AbsenceTypeDTO {
  public string Name { get; set; } = "";
  public string Code { get; set; } = "";
  public string ColorCode { get; set; } = "";
  public ICollection<int>? Absences { get; set; }
}