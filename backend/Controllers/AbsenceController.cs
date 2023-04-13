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

    User? user = await _context.Users.FindAsync(absence.UserId);
    if (user == null) {
      return BadRequest("Invalid user id");
    }

    AbsenceType? absenceType = await _context.AbsenceTypes.FindAsync(absence.AbsenceTypeId);
    if (absenceType == null) {
      return BadRequest("Invalid absence type id");
    }

    // Check if absence already exists
    if (await _context.Absences.AnyAsync(a => a.UserId == absence.UserId && (a.StartDate == absence.StartDate || a.EndDate == absence.EndDate))) {
      return BadRequest("Absence already exists");
    }

    Absence? newAbsence = new() {
      StartDate = absence.StartDate,
      EndDate = absence.EndDate,
      Comment = absence.Comment,
      IsApproved = absence.IsApproved,
      AbsenceTypeId = absence.AbsenceTypeId,
      UserId = absence.UserId
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

    User? user = await _context.Users.FindAsync(absence.UserId);
    if (user == null) {
      return BadRequest("Invalid user id");
    }

    AbsenceType? absenceType = await _context.AbsenceTypes.FindAsync(absence.AbsenceTypeId);
    if (absenceType == null) {
      return BadRequest("Invalid absence type id");
    }

    // Check if absence already exists
    if (await _context.Absences.AnyAsync(a => a.UserId == absence.UserId && (a.StartDate == absence.StartDate || a.EndDate == absence.EndDate) && a.AbsenceId != id)) {
      return BadRequest("Absence already exists");
    }

    existingAbsence.StartDate = absence.StartDate;
    existingAbsence.EndDate = absence.EndDate;
    existingAbsence.AbsenceTypeId = absence.AbsenceTypeId;
    existingAbsence.IsApproved = absence.IsApproved;
    existingAbsence.Comment = absence.Comment;
    existingAbsence.UserId = absence.UserId;

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

  [HttpGet("{id}")]
  public async Task<IActionResult> GetAbsence(int id) {
    Absence? absence = await _context.Absences.FindAsync(id);
    return absence == null ? BadRequest("Invalid absence id") : Ok(absence);
  }

  [HttpGet]
  public async Task<IActionResult> GetAbsences(
    [FromQuery(Name = "fromDate")] DateTime? FromDate,
    [FromQuery(Name = "toDate")] DateTime? ToDate
  ) {
    IQueryable<Absence> absences = _context.Absences;

    if (FromDate != null) {
      absences = absences.Where(a => a.EndDate >= FromDate);
    }

    if (ToDate != null) {
      absences = absences.Where(a => a.StartDate <= ToDate);
    }

    List<Absence> result = await absences.ToListAsync();

    foreach (Absence absence in result) {
      await _context.Entry(absence).Reference(a => a.Type).LoadAsync();
    }

    return Ok(result);
  }

  [HttpGet("user/{id}")]
  public async Task<IActionResult> GetAbsenceForUser(
    int id,
    [FromQuery(Name = "fromDate")] DateTime? FromDate,
    [FromQuery(Name = "toDate")] DateTime? ToDate
  ) {
    IQueryable<Absence> absences = _context.Absences.Where(a => a.UserId == id);

    if (FromDate != null) {
      absences = absences.Where(a => a.EndDate >= FromDate);
    }

    if (ToDate != null) {
      absences = absences.Where(a => a.StartDate <= ToDate);
    }

    List<Absence> result = await absences.ToListAsync();

    foreach (Absence absence in result) {
      await _context.Entry(absence).Reference(a => a.Type).LoadAsync();
    }

    return Ok(result);
  }



}
