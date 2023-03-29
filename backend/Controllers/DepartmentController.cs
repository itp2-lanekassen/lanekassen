using Lanekassen.Database;
using Lanekassen.Models;
using Lanekassen.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Lanekassen.Controllers;

[ApiController]
[Route("[controller]")]
public class DepartmentController : ControllerBase {
  private readonly ILogger<DepartmentController> _logger;
  private readonly ApiDbContext _context;

  public DepartmentController(ILogger<DepartmentController> logger, ApiDbContext context) {
    _logger = logger;
    _context = context;
  }

  [HttpPost]
  public async Task<IActionResult> CreateDepartment([FromBody] DepartmentDTO department) {
    if (!ModelState.IsValid) {
      return BadRequest(ModelState);
    }

    Department? newDepartment = new() {
      Name = department.Name,
      Abbreviation = department.Abbreviation,
    };

    try {
      _ = _context.Departments.Add(newDepartment);
      _ = await _context.SaveChangesAsync();
    } catch (DbUpdateException ex) {
      _logger.LogError(ex, "Error creating department");
      return StatusCode(
          500,
          new {
            message = "Error creating department",
            error = ex.Message
          }
      );
    }

    return Ok();
  }

  [HttpPut("{id}")]
  public async Task<IActionResult> UpdateDepartment(int id, [FromBody] DepartmentDTO department) {
    if (!ModelState.IsValid) {
      return BadRequest(ModelState);
    }

    Department? existingDepartment = await _context.Departments.FindAsync(id);
    if (existingDepartment == null) {
      return BadRequest("Invalid department id");
    }

    existingDepartment.Name = department.Name;
    existingDepartment.Abbreviation = department.Abbreviation;
    
    try {
      _ = await _context.SaveChangesAsync();
    } catch (DbUpdateException ex) {
      _logger.LogError(ex, "Error updating department");
      return StatusCode(
          500,
          new {
            message = "Error updating department",
            error = ex.Message
          }
      );
    }

    return Ok();
  }

  [HttpDelete("{id}")]
  public async Task<IActionResult> DeleteDepartment(int id) {
    Department? existingDepartment = await _context.Departments.FindAsync(id);
    if (existingDepartment == null) {
      return BadRequest("Invalid department id");
    }

    try {
      _ = _context.Departments.Remove(existingDepartment);
      _ = await _context.SaveChangesAsync();
    } catch (DbUpdateException ex) {
      _logger.LogError(ex, "Error deleting department");
      return StatusCode(
          500,
          new {
            message = "Error deleting department",
            error = ex.Message
          }
      );
    }

    return Ok();
  }

  [HttpGet]
  public async Task<IActionResult> GetDepartments() {
    return Ok(await _context.Departments.ToListAsync());
  }

  [HttpGet("{id}")]
  public async Task<IActionResult> GetDepartment(int id) {
    Department? existingDepartment = await _context.Departments.FindAsync(id);
    return existingDepartment == null ? BadRequest("Invalid department id") : Ok(existingDepartment);
  }

  [HttpGet("{id}/sections")]
  public async Task<IActionResult> GetDepartmentSections(int id) {
    Department? department = await _context.Departments.FindAsync(id);
    if (department == null) {
      return BadRequest("Invalid department id");
    }
    List<Section> sections = await _context.Sections.Where(u => u.Departments.Contains(department)).ToListAsync();
    return Ok(sections);
  }

  [HttpGet("{id}/teams")]
  public async Task<IActionResult> GetDepartmentTeams(int id) {
    Department? department = await _context.Departments.FindAsync(id);
    if (department == null) {
      return BadRequest("Invalid department id");
    }
    List<Team> teams = await _context.Teams.Where(u => u.Departments.Contains(department)).ToListAsync();
    return Ok(teams);
  }

  [HttpGet("{id}/roles")]
  public async Task<IActionResult> GetDepartmentRoles(int id) {
    Department? department = await _context.Departments.FindAsync(id);
    if (department == null) {
      return BadRequest("Invalid department id");
    }
    List<Role> roles = await _context.Roles.Where(u => u.Departments.Contains(department)).ToListAsync();
    return Ok(roles);
  }



  [HttpGet("{id}/subjectfields")]
  public async Task<IActionResult> GetDepartmentSubjectFields(int id) {
    Department? department = await _context.Departments.FindAsync(id);
    if (department == null) {
      return BadRequest("Invalid department id");
    }
    List<SubjectField> subjectFields = await _context.SubjectFields.Where(u => u.DepartmentId == department.DepartmentId).ToListAsync();
    return Ok(subjectFields);
  }


}