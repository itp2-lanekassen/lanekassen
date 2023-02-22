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

    Section? newSection = new() {
      Name = section.Name,
      Users = await _context.Users.Where(u => section.Users.Contains(u.UserId)).ToListAsync(),
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

    existingSection.Name = section.Name;
    existingSection.Users = await _context.Users.Where(u => section.Users.Contains(u.UserId)).ToListAsync();

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
    return Ok(await _context.Sections.ToListAsync());
  }

  [HttpGet("{id}")]
  public async Task<IActionResult> GetSection(int id) {
    Section? section = await _context.Sections.FindAsync(id);
    return section == null ? BadRequest("Invalid section id") : Ok(section);
  }

  [HttpGet("{id}/users")]
  public async Task<IActionResult> GetSectionUsers(int id) {
    Section? section = await _context.Sections.FindAsync(id);
    return section == null ? BadRequest("Invalid section id") : Ok(section.Users);
  }

  [HttpGet("{id}/users/{userId}")]
  public async Task<IActionResult> GetSectionUser(int id, int userId) {
    Section? section = await _context.Sections.FindAsync(id);
    if (section == null) {
      return BadRequest("Invalid section id");
    }

    User? user = await _context.Users.FindAsync(userId);
    return user == null ? BadRequest("Invalid user id") : !section.Users.Contains(user) ? BadRequest("User is not in section") : Ok(user);
  }

  [HttpPost("{id}/users/{userId}")]
  public async Task<IActionResult> AddSectionUser(int id, int userId) {
    Section? section = await _context.Sections.FindAsync(id);
    if (section == null) {
      return BadRequest("Invalid section id");
    }

    User? user = await _context.Users.FindAsync(userId);
    if (user == null) {
      return BadRequest("Invalid user id");
    }

    if (section.Users.Contains(user)) {
      return BadRequest("User is already in section");
    }

    section.Users.Add(user);

    try {
      _ = _context.Sections.Update(section);
      _ = await _context.SaveChangesAsync();
    } catch (DbUpdateException ex) {
      _logger.LogError(ex, "Error adding user to section");
      return StatusCode(
          500,
          new {
            message = "Error adding user to section",
            error = ex.Message
          }
      );
    }

    return Ok();
  }

  [HttpDelete("{id}/users/{userId}")]
  public async Task<IActionResult> RemoveSectionUser(int id, int userId) {
    Section? section = await _context.Sections.FindAsync(id);
    if (section == null) {
      return BadRequest("Invalid section id");
    }

    User? user = await _context.Users.FindAsync(userId);
    if (user == null) {
      return BadRequest("Invalid user id");
    }

    if (!section.Users.Contains(user)) {
      return BadRequest("User is not in section");
    }

    _ = section.Users.Remove(user);

    try {
      _ = _context.Sections.Update(section);
      _ = await _context.SaveChangesAsync();
    } catch (DbUpdateException ex) {
      _logger.LogError(ex, "Error removing user from section");
      return StatusCode(
          500,
          new {
            message = "Error removing user from section",
            error = ex.Message
          }
      );
    }

    return Ok();
  }



}
