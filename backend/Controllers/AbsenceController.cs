using Lanekassen.Database;
using Lanekassen.Models;
using Lanekassen.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Lanekassen.Controllers;

[ApiController]
[Route("[controller]")]
public class AbsenceController : ControllerBase {
  private readonly ILogger<AbsenceController> _logger;
  private readonly ApiDbContext _context;

  public AbsenceController(ILogger<AbsenceController> logger, ApiDbContext context) {
    _logger = logger;
    _context = context;
  }

  [HttpPost]
  public async Task<IActionResult> CreateAbsence([FromBody] AbsenceDTO absence) {
    if (!ModelState.IsValid) {
      return BadRequest(ModelState);
    }

    Absence? newAbsence = new() {
      StartDate = absence.StartDate,
      EndDate = absence.EndDate,
      Comment = absence.Comment,
      AbsenceTypeId = absence.AbsenceTypeId
    };

    try {
      _ = _context.Absences.Add(newAbsence);
      _ = await _context.SaveChangesAsync();
    } catch (DbUpdateException ex) {
      _logger.LogError(ex, "Error creating absence");
      return StatusCode(
          500,
          new {
            message = "Error creating absence",
            error = ex.Message
          }
      );
    }

    return Ok();
  }

  [HttpPut("{id}")]
  public async Task<IActionResult> UpdateAbsence(int id, [FromBody] AbsenceDTO absence) {
    if (!ModelState.IsValid) {
      return BadRequest(ModelState);
    }

    Absence? existingAbsence = await _context.Absences.FindAsync(id);
    if (existingAbsence == null) {
      return BadRequest("Invalid absence id");
    }

    existingAbsence.StartDate = absence.StartDate;
    existingAbsence.EndDate = absence.EndDate;
    existingAbsence.AbsenceTypeId = absence.AbsenceTypeId;
    existingAbsence.Comment = absence.Comment;

    try {
      _ = await _context.SaveChangesAsync();
    } catch (DbUpdateException ex) {
      _logger.LogError(ex, "Error updating absence");
      return StatusCode(
          500,
          new {
            message = "Error updating absence",
            error = ex.Message
          }
      );
    }

    return Ok();
  }

  [HttpDelete("{id}")]
  public async Task<IActionResult> DeleteAbsence(int id) {
    Absence? existingAbsence = await _context.Absences.FindAsync(id);
    if (existingAbsence == null) {
      return BadRequest("Invalid absence id");
    }

    try {
      _ = _context.Absences.Remove(existingAbsence);
      _ = await _context.SaveChangesAsync();
    } catch (DbUpdateException ex) {
      _logger.LogError(ex, "Error deleting absence");
      return StatusCode(
          500,
            new {
              message = "Error deleting absence",
              error = ex.Message
            }
        );
    }

    return Ok();
  }

  [HttpGet]
  public async Task<IActionResult> GetAbsences() {
    List<Absence> absences = await _context.Absences.ToListAsync();
    return Ok(absences);
  }

  [HttpGet("{id}")]
  public async Task<IActionResult> GetAbsence(int id) {
    Absence? absence = await _context.Absences.FindAsync(id);
    return absence == null ? BadRequest("Invalid absence id") : Ok(absence);
  }



}
