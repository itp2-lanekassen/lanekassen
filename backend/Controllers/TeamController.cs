using Lanekassen.Database;
using Lanekassen.Models;
using Lanekassen.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Lanekassen.Controllers;

[ApiController]
[Route("[controller]")]
public class TeamController : ControllerBase {
  private readonly ILogger<TeamController> _logger;
  private readonly ApiDbContext _context;

  public TeamController(ILogger<TeamController> logger, ApiDbContext context) {
    _logger = logger;
    _context = context;
  }

  [HttpPost]
  public async Task<IActionResult> CreateTeam([FromBody] TeamDTO team) {
    if (!ModelState.IsValid) {
      return BadRequest(ModelState);
    }

    Team? newTeam = new() {
      Name = team.Name,
      Departments = await _context.Departments.Where(d => team.Departments!.Contains(d.DepartmentId)).ToListAsync(),
    };

    try {
      _ = _context.Teams.Add(newTeam);
      _ = await _context.SaveChangesAsync();
    } catch (DbUpdateException ex) {
      _logger.LogError(ex, "Error creating team");
      return StatusCode(
          500,
          new {
            message = "Error creating team",
            error = ex.Message
          }
      );
    }

    return Ok();
  }

  [HttpPut("{id}")]
  public async Task<IActionResult> UpdateTeam(int id, [FromBody] TeamDTO team) {
    if (!ModelState.IsValid) {
      return BadRequest(ModelState);
    }

    Team? existingTeam = await _context.Teams.Include(t => t.Departments).FirstOrDefaultAsync(t => t.TeamId == id);
    if (existingTeam == null) {
      return BadRequest("Invalid team id");
    }

    existingTeam.Name = team.Name;

    existingTeam.Departments.Clear();

    existingTeam.Departments = await _context.Departments.Where(d => team.Departments!.Contains(d.DepartmentId)).ToListAsync();

    try {
      _ = _context.Teams.Update(existingTeam);
      _ = await _context.SaveChangesAsync();
    } catch (DbUpdateException ex) {
      _logger.LogError(ex, "Error updating team");
      return StatusCode(
          500,
          new {
            message = "Error updating team",
            error = ex.Message
          }
      );
    }

    return Ok();
  }

  [HttpDelete("{id}")]
  public async Task<IActionResult> DeleteTeam(int id) {
    Team? team = await _context.Teams.FindAsync(id);
    if (team == null) {
      return BadRequest("Invalid team id");
    }

    try {
      _ = _context.Teams.Remove(team);
      _ = await _context.SaveChangesAsync();
    } catch (DbUpdateException ex) {
      _logger.LogError(ex, "Error deleting team");
      return StatusCode(
          500,
          new {
            message = "Error deleting team",
            error = ex.Message
          }
      );
    }

    return Ok();
  }

  [HttpGet]
  public async Task<IActionResult> GetTeams() {
    List<Team> teams = await _context.Teams.Include((s) => s.Departments).ToListAsync();
    return Ok(teams);
  }

  [HttpGet("{id}")]
  public async Task<IActionResult> GetTeam(int id) {
    Team? team = await _context.Teams.FindAsync(id);
    return team == null ? BadRequest("Invalid team id") : Ok(team);
  }

  [HttpGet("{id}/users")]
  public async Task<IActionResult> GetTeamUsers(int id) {
    Team? team = await _context.Teams.FindAsync(id);
    if (team == null) {
      return BadRequest("Invalid team id");
    }

    List<User> users = await _context.Users.Where(u => u.Teams.Contains(team)).ToListAsync();
    return Ok(users);
  }

}