using Lanekassen.Database;
using Lanekassen.Models;
using Lanekassen.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Lanekassen.Controllers;

[ApiController]
[Route("[controller]")]
public class SubjectFieldsController : ControllerBase {
  private readonly ILogger<SubjectFieldsController> _logger;
  private readonly ApiDbContext _context;

  public SubjectFieldsController(ILogger<SubjectFieldsController> logger, ApiDbContext context) {
    _logger = logger;
    _context = context;
  }

  [HttpPost]
  public async Task<IActionResult> CreateSubjectField([FromBody] SubjectFieldDTO subjectField) {
    if (!ModelState.IsValid) {
      return BadRequest(ModelState);
    }

    Department? department = await _context.Departments.FindAsync(subjectField.DepartmentId);
    if (department == null) {
      return BadRequest("Invalid department id");
    }

    SubjectField? newSubjectField = new() {
      Name = subjectField.Name,
      DepartmentId = subjectField.DepartmentId
    };

    try {
      _ = _context.SubjectFields.Add(newSubjectField);
      _ = await _context.SaveChangesAsync();
    } catch (DbUpdateException ex) {
      _logger.LogError(ex, "Error creating subject field");
      return StatusCode(
          500,
          new {
            message = "Error creating subject field",
            error = ex.Message
          }
      );
    }

    return Ok();
  }

  [HttpPut("{id}")]
  public async Task<IActionResult> UpdateSubjectField(int id, [FromBody] SubjectFieldDTO subjectField) {
    if (!ModelState.IsValid) {
      return BadRequest(ModelState);
    }

    SubjectField? existingSubjectField = await _context.SubjectFields.FindAsync(id);
    if (existingSubjectField == null) {
      return BadRequest("Invalid subject field id");
    }

    Department? department = await _context.Departments.FindAsync(subjectField.DepartmentId);
    if (department == null) {
      return BadRequest("Invalid department id");
    }

    existingSubjectField.Name = subjectField.Name;
    existingSubjectField.DepartmentId = subjectField.DepartmentId;

    try {
      _ = await _context.SaveChangesAsync();
    } catch (DbUpdateException ex) {
      _logger.LogError(ex, "Error updating subject field");
      return StatusCode(
          500,
          new {
            message = "Error updating subject field",
            error = ex.Message
          }
      );
    }

    return Ok();
  }

  [HttpDelete("{id}")]
  public async Task<IActionResult> DeleteSubjectField(int id) {
    SubjectField? subjectField = await _context.SubjectFields.FindAsync(id);
    if (subjectField == null) {
      return BadRequest("Invalid subject field id");
    }

    try {
      _ = _context.SubjectFields.Remove(subjectField);
      _ = await _context.SaveChangesAsync();
    } catch (DbUpdateException ex) {
      _logger.LogError(ex, "Error deleting subject field");
      return StatusCode(
          500,
          new {
            message = "Error deleting subject field",
            error = ex.Message
          }
        );
    }

    return Ok();
  }

  [HttpGet]
  public async Task<IActionResult> GetSubjectFields() {
    return Ok(await _context.SubjectFields.Include((s) => s.Department).ToListAsync());
  }

  [HttpGet("{id}")]
  public async Task<IActionResult> GetSubjectField(int id) {
    SubjectField? subjectField = await _context.SubjectFields.FindAsync(id);
    return subjectField == null ? BadRequest("Invalid subject field id") : Ok(subjectField);
  }

  [HttpGet("{id}/users")]
  public async Task<IActionResult> GetSubjectFieldUsers(int id) {
    SubjectField? subjectField = await _context.SubjectFields.FindAsync(id);

    if (subjectField == null) {
      return BadRequest("Invalid subject field id");
    }

    List<User> users = await _context.Users.Where(u => u.SubjectFields.Contains(subjectField)).ToListAsync();
    return Ok(users);
  }
}
