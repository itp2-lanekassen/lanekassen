using Lanekassen.Database;
using Lanekassen.Models;
using Lanekassen.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Lanekassen.Controllers;

[ApiController]
[Route("[controller]")]
public class SectionController : ControllerBase {
  private readonly ILogger<SectionController> _logger;
  private readonly ApiDbContext _context;

  public SectionController(ILogger<SectionController> logger, ApiDbContext context) {
    _logger = logger;
    _context = context;
  }

  [HttpPost]
  public async Task<IActionResult> CreateSection([FromBody] SectionDTO section) {
    if (!ModelState.IsValid) {
      return BadRequest(ModelState);
    }

    Department? department = await _context.Departments.FindAsync(section.DepartmentId);
    if (department == null) {
      return BadRequest("Invalid department id");
    }

    if (await _context.Sections.AnyAsync(s => s.Name == section.Name && s.DepartmentId == section.DepartmentId)) {
      return BadRequest("Section already exists");
    }

    Section? newSection = new() {
      Name = section.Name,
      DepartmentId = section.DepartmentId
    };

    try {
      _ = _context.Sections.Add(newSection);
      _ = await _context.SaveChangesAsync();
    } catch (DbUpdateException ex) {
      _logger.LogError(ex, "Error creating section");
      return StatusCode(
          500,
          new {
            message = "Error creating section",
            error = ex.Message
          }
      );
    }

    return Ok();
  }

  [HttpPut("{id}")]
  public async Task<IActionResult> UpdateSection(int id, [FromBody] SectionDTO section) {
    if (!ModelState.IsValid) {
      return BadRequest(ModelState);
    }

    Section? existingSection = await _context.Sections.FindAsync(id);
    if (existingSection == null) {
      return BadRequest("Invalid section id");
    }

    Department? department = await _context.Departments.FindAsync(section.DepartmentId);
    if (department == null) {
      return BadRequest("Invalid department id");
    }

    if (await _context.Sections.AnyAsync(s => s.Name == section.Name && s.SectionId != id && s.DepartmentId == section.DepartmentId)) {
      return BadRequest("Section already exists");
    }

    existingSection.Name = section.Name;
    existingSection.DepartmentId = section.DepartmentId;

    try {
      _ = _context.Sections.Update(existingSection);
      _ = await _context.SaveChangesAsync();
    } catch (DbUpdateException ex) {
      _logger.LogError(ex, "Error updating section");
      return StatusCode(
          500,
          new {
            message = "Error updating section",
            error = ex.Message
          }
      );
    }

    return Ok();
  }

  [HttpDelete("{id}")]
  public async Task<IActionResult> DeleteSection(int id) {
    Section? existingSection = await _context.Sections.FindAsync(id);
    if (existingSection == null) {
      return BadRequest("Invalid section id");
    }

    try {
      _ = _context.Sections.Remove(existingSection);
      _ = await _context.SaveChangesAsync();
    } catch (DbUpdateException ex) {
      _logger.LogError(ex, "Error deleting section");
      return StatusCode(
          500,
          new {
            message = "Error deleting section",
            error = ex.Message
          }
        );
    }

    return Ok();
  }

  [HttpGet]
  public async Task<IActionResult> GetSections() {
    return Ok(await _context.Sections.Include((s) => s.Department).ToListAsync());
  }

  [HttpGet("{id}")]
  public async Task<IActionResult> GetSection(int id) {
    Section? section = await _context.Sections.FindAsync(id);
    return section == null ? BadRequest("Invalid section id") : Ok(section);
  }

  [HttpGet("{id}/users")]
  public async Task<IActionResult> GetSectionUsers(int id) {
    Section? section = await _context.Sections.FindAsync(id);

    if (section == null) {
      return BadRequest("Invalid section id");
    }

    List<User> users = await _context.Users.Where(u => u.SectionId == id).ToListAsync();
    return Ok(users);
  }
}
