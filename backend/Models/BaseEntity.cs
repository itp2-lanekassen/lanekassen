namespace Lanekassen.Models;

// Base Entity with properties that should be present on all models
public class BaseEntity {
  public int Id { get; set; }

  // Date fields not planned, but might be useful?
  public DateTime DateAdded { get; set; }

  public DateTime DateUpdated { get; set; }
}
