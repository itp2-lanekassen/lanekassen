namespace Lanekassen.Models.DTO;

public class AbsenceDTO {
  public int Id { get; set; }
  public DateTime StartDate { get; set; }
  public DateTime EndDate { get; set; }
  public string? Comment { get; set; }
  public int AbsenceTypeId { get; set; }
  public int UserId { get; set; }
}