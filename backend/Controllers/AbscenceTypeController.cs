using Lanekassen.Database;
using Lanekassen.Models;
using Lanekassen.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Lanekassen.Controllers;

[ApiController]
[Route("[controller]")]
public class AbsenceTypeController : ControllerBase {
  private readonly ILogger<AbsenceTypeController> _logger;
  private readonly ApiDbContext _context;

  public AbsenceTypeController(ILogger<AbsenceTypeController> logger, ApiDbContext context) {
    _logger = logger;
    _context = context;
  }

  [HttpPost]
  public async Task<IActionResult> CreateAbsenceType([FromBody] AbsenceTypeDTO absenceType) {
    if (!ModelState.IsValid) {
      return BadRequest(ModelState);
    }

    AbsenceType? newAbsenceType = new() {
      Name = absenceType.Name,
      Code = absenceType.Code,
      ColorCode = absenceType.ColorCode,
    };

    try {
      _ = _context.AbsenceTypes.Add(newAbsenceType);
      _ = await _context.SaveChangesAsync();
    } catch (DbUpdateException ex) {
      _logger.LogError(ex, "Error creating absence type");
      return StatusCode(
          500,
          new {
            message = "Error creating absence type",
            error = ex.Message
          }
      );
    }

    return Ok();
  }

  [HttpPut("{id}")]
  public async Task<IActionResult> UpdateAbsenceType(int id, [FromBody] AbsenceTypeDTO absenceType) {
    if (!ModelState.IsValid) {
      return BadRequest(ModelState);
    }

    AbsenceType? existingAbsenceType = await _context.AbsenceTypes.FindAsync(id);
    if (existingAbsenceType == null) {
      return BadRequest("Invalid absence type id");
    }

    existingAbsenceType.Name = absenceType.Name;
    existingAbsenceType.Code = absenceType.Code;
    existingAbsenceType.ColorCode = absenceType.ColorCode;

    try {
      _ = _context.AbsenceTypes.Update(existingAbsenceType);
      _ = await _context.SaveChangesAsync();
    } catch (DbUpdateException ex) {
      _logger.LogError(ex, "Error updating absence type");
      return StatusCode(
          500,
          new {
            message = "Error updating absence type",
            error = ex.Message
          }
      );
    }

    return Ok();
  }

  [HttpDelete("{id}")]
  public async Task<IActionResult> DeleteAbsenceType(int id) {
    AbsenceType? existingAbsenceType = await _context.AbsenceTypes.FindAsync(id);
    if (existingAbsenceType == null) {
      return BadRequest("Invalid absence type id");
    }

    try {
      _ = _context.AbsenceTypes.Remove(existingAbsenceType);
      _ = await _context.SaveChangesAsync();
    } catch (DbUpdateException ex) {
      _logger.LogError(ex, "Error deleting absence type");
      return StatusCode(
          500,
          new {
            message = "Error deleting absence type",
            error = ex.Message
          }
      );
    }

    return Ok();
  }

  [HttpGet]
  public async Task<IActionResult> GetAbsenceTypes() {
    List<AbsenceType> absenceTypes = await _context.AbsenceTypes.ToListAsync();
    return Ok(absenceTypes);
  }

  [HttpGet("{id}")]
  public async Task<IActionResult> GetAbsenceType(int id) {
    AbsenceType? absenceType = await _context.AbsenceTypes.FindAsync(id);
    if (absenceType == null) {
      return BadRequest("Invalid absence type id");
    }

    return Ok(absenceType);
  }







}