namespace Lanekassen.Models.DTO;

public class PageResponseDTO<T> {
  public int Page { get; set; }
  public int Size { get; set; }
  public int TotalPages { get; set; }
  public List<T> Data { get; set; } = null!;
}