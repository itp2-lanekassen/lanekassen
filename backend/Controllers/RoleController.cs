using Lanekassen.Database;
using Lanekassen.Models;
using Lanekassen.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Lanekassen.Controllers;

[ApiController]
[Route("[controller]")]
public class RoleController : ControllerBase {
  private readonly ILogger<RoleController> _logger;
  private readonly ApiDbContext _context;

  public RoleController(ILogger<RoleController> logger, ApiDbContext context) {
    _logger = logger;
    _context = context;
  }

  [HttpPost]
  public async Task<IActionResult> CreateRole([FromBody] RoleDTO role) {
    if (!ModelState.IsValid) {
      return BadRequest(ModelState);
    }

    Department? department = await _context.Departments.FindAsync(role.Departments!.First());
    if (department == null) {
      return BadRequest("Invalid department id");
    }

    if (await _context.Roles.AnyAsync(r => r.Name == role.Name && r.Departments.Contains(department))) {
      return BadRequest("Role already exists");
    }

    Role? newRole = new() {
      Name = role.Name,
      Departments = await _context.Departments.Where(d => role.Departments!.Contains(d.DepartmentId)).ToListAsync(),
    };

    try {
      _ = _context.Roles.Add(newRole);
      _ = await _context.SaveChangesAsync();
    } catch (DbUpdateException ex) {
      _logger.LogError(ex, "Error creating role");
      return StatusCode(
          500,
          new {
            message = "Error creating role",
            error = ex.Message
          }
      );
    }

    return Ok();
  }

  [HttpPut("{id}")]
  public async Task<IActionResult> UpdateRole(int id, [FromBody] RoleDTO role) {
    if (!ModelState.IsValid) {
      return BadRequest(ModelState);
    }

    Role? existingRole = await _context.Roles.Include(t => t.Departments).FirstOrDefaultAsync(t => t.RoleId == id);
    if (existingRole == null) {
      return BadRequest("Invalid role id");
    }

    Department? department = await _context.Departments.FindAsync(role.Departments!.First());
    if (department == null) {
      return BadRequest("Invalid department id");
    }

    if (await _context.Roles.AnyAsync(r => r.Name == role.Name && r.Departments.Contains(department) && r.RoleId != id)) {
      return BadRequest("Role already exists");
    }

    existingRole.Name = role.Name;

    existingRole.Departments.Clear();

    existingRole.Departments = await _context.Departments.Where(d => role.Departments!.Contains(d.DepartmentId)).ToListAsync();

    try {
      _ = _context.Roles.Update(existingRole);
      _ = await _context.SaveChangesAsync();
    } catch (DbUpdateException ex) {
      _logger.LogError(ex, "Error updating role");
      return StatusCode(
          500,
          new {
            message = "Error updating role",
            error = ex.Message
          }
      );
    }

    return Ok();
  }

  [HttpDelete("{id}")]
  public async Task<IActionResult> DeleteRole(int id) {
    Role? role = await _context.Roles.FindAsync(id);
    if (role == null) {
      return BadRequest("Invalid role id");
    }

    try {
      _ = _context.Roles.Remove(role);
      _ = await _context.SaveChangesAsync();
    } catch (DbUpdateException ex) {
      _logger.LogError(ex, "Error deleting role");
      return StatusCode(
          500,
          new {
            message = "Error deleting role",
            error = ex.Message
          }
      );
    }

    return Ok();
  }

  [HttpGet]
  public async Task<IActionResult> GetRoles() {
    List<Role> roles = await _context.Roles.Include((s) => s.Departments).ToListAsync();
    return Ok(roles);
  }

  [HttpGet("{id}")]
  public async Task<IActionResult> GetRole(int id) {
    Role? role = await _context.Roles.FindAsync(id);
    return role == null ? BadRequest("Invalid role id") : Ok(role);
  }

  [HttpGet("{id}/users")]
  public async Task<IActionResult> GetRoleUsers(int id) {
    Role? role = await _context.Roles.FindAsync(id);
    if (role == null) {
      return BadRequest("Invalid role id");
    }

    List<User> users = await _context.Users.Where(u => u.Roles.Contains(role)).ToListAsync();
    return Ok(users);
  }
}