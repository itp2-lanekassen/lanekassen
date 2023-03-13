using Lanekassen.Database;
using Lanekassen.Models;
using Lanekassen.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Lanekassen.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase {
  private readonly ILogger<UserController> _logger;
  private readonly ApiDbContext _context;

  public UserController(ILogger<UserController> logger, ApiDbContext context) {
    _logger = logger;
    _context = context;
  }

  [HttpPost]
  public async Task<IActionResult> CreateUser([FromBody] UserDTO user) {
    if (!ModelState.IsValid) {
      return BadRequest(ModelState);
    }

    Section? section = await _context.Sections.FindAsync(user.SectionId);
    if (section == null) {
      return BadRequest("Invalid section id");
    }

    Department? department = await _context.Departments.FindAsync(user.DepartmentId);
    if (department == null) {
      return BadRequest("Invalid department id");
    }

    User? newUser = new() {
      AzureId = user.AzureId,
      FirstName = user.FirstName,
      LastName = user.LastName,
      Email = user.Email,
      EmploymentType = user.EmploymentType,
      Admin = user.Admin,
      Section = section,
      SubjectFields = await _context.SubjectFields.Where(sf => user.SubjectFields.Contains(sf.SubjectFieldId)).ToListAsync(),
      Roles = await _context.Roles.Where(r => user.Roles!.Contains(r.RoleId)).ToListAsync(),
      Teams = await _context.Teams.Where(t => user.Teams!.Contains(t.TeamId)).ToListAsync(),
      Department = department,
    };

    try {
      _ = _context.Users.Add(newUser);
      _ = await _context.SaveChangesAsync();
    } catch (DbUpdateException ex) {
      _logger.LogError(ex, "Error creating user");
      return StatusCode(
          500,
          new {
            message = "Error creating user",
            error = ex.Message
          }
      );
    }

    return Ok();
  }

  [HttpGet]
  public async Task<IActionResult> GetUsers() {
    List<User> users = await _context.Users.ToListAsync();
    foreach (User user in users) {
      _context.Entry(user).Collection(user => user.SubjectFields).Load();
      _context.Entry(user).Collection(user => user.Roles).Load();
      _context.Entry(user).Collection(user => user.Teams).Load();
      _context.Entry(user).Collection(user => user.Absences).Load();
    }
    return Ok(users);
  }

  //update user
  [HttpPut("{id}")]
  public async Task<IActionResult> UpdateUser(int id, [FromBody] UserDTO user) {
    if (!ModelState.IsValid) {
      return BadRequest(ModelState);
    }

    Section? section = await _context.Sections.FindAsync(user.SectionId);
    if (section == null) {
      return BadRequest("Invalid section id");
    }

    Department? department = await _context.Departments.FindAsync(user.DepartmentId);
    if (department == null) {
      return BadRequest("Invalid department id");
    }

    User? userToUpdate = await _context.Users
        .Include(u => u.Roles)
        .Include(u => u.Teams)
        .Include(u => u.SubjectFields)
        .FirstOrDefaultAsync(u => u.UserId == id);

    if (userToUpdate == null) {
      return NotFound();
    }

    userToUpdate.FirstName = user.FirstName;
    userToUpdate.LastName = user.LastName;
    userToUpdate.Email = user.Email;
    userToUpdate.EmploymentType = user.EmploymentType;
    userToUpdate.Admin = user.Admin;
    userToUpdate.Section = section;
    userToUpdate.Department = department;

    // Clear existing roles, teams and subject fields
    userToUpdate.Roles.Clear();
    userToUpdate.Teams.Clear();
    userToUpdate.SubjectFields.Clear();

    // Add new roles, teams and subject fields
    foreach (int roleId in user.Roles ?? Array.Empty<int>()) {
      Role? role = await _context.Roles.FindAsync(roleId);
      if (role != null) {
        userToUpdate.Roles.Add(role);
      }
    }
    foreach (int teamId in user.Teams ?? Array.Empty<int>()) {
      Team? team = await _context.Teams.FindAsync(teamId);
      if (team != null) {
        userToUpdate.Teams.Add(team);
      }
    }
    foreach (int subjectFieldId in user.SubjectFields ?? Array.Empty<int>()) {
      SubjectField? subjectField = await _context.SubjectFields.FindAsync(subjectFieldId);
      if (subjectField != null) {
        userToUpdate.SubjectFields.Add(subjectField);
      }
    }

    try {
      await _context.SaveChangesAsync();
    } catch (DbUpdateException ex) {
      _logger.LogError(ex, "Error updating user");
      return StatusCode(
          500,
          new {
            message = "Error updating user",
            error = ex.Message
          }
      );
    }

    return Ok();
  }

  //delete user
  [HttpDelete("{id}")]
  public async Task<IActionResult> DeleteUser(int id) {
    User? userToDelete = await _context.Users.FindAsync(id);
    if (userToDelete == null) {
      return NotFound();
    }

    try {
      _ = _context.Users.Remove(userToDelete);
      _ = await _context.SaveChangesAsync();
    } catch (DbUpdateException ex) {
      _logger.LogError(ex, "Error deleting user");
      return StatusCode(
          500,
          new {
            message = "Error deleting user",
            error = ex.Message
          }
      );
    }
    return Ok();
  }

  //get user by id
  [HttpGet("{id}")]
  public async Task<IActionResult> GetUserById(int id) {
    User? user = await _context.Users.FindAsync(id);
    return user == null ? NotFound() : Ok(user);
  }

  //get user by azure id
  [HttpGet("azure/{azureId}")]
  public async Task<IActionResult> GetUserByAzureId(string azureId) {
    User? user = await _context.Users.Include(u => u.SubjectFields).Include(u => u.Roles).Include(u => u.Teams).FirstOrDefaultAsync(u => u.AzureId == azureId);
    return user == null ? NotFound() : Ok(user);
  }

  [HttpGet("filter")]
  public async Task<IActionResult> FilterUsers(
    [FromQuery(Name = "excludeIds")] List<int> ExcludeIds,
    [FromQuery(Name = "departments")] List<int> Departments,
    [FromQuery(Name = "sections")] List<int> Sections,
    [FromQuery(Name = "teams")] List<int> Teams,
    [FromQuery(Name = "roles")] List<int> Roles,
    [FromQuery(Name = "subjectFields")] List<int> SubjectFields
  ) {
    IQueryable<User> users = _context.Users;

    if (ExcludeIds.Count > 0) {
      users = users.Where(u => !ExcludeIds.Contains(u.UserId));
    }

    if (Departments.Count > 0) {
      users = users.Where(u => Departments.Contains(u.Department.DepartmentId));
    }

    if (Sections.Count > 0) {
      users = users.Where(u => Sections.Contains(u.Section.SectionId));
    }

    if (Teams.Count > 0) {
      users = users.Where(u => u.Teams.Any(t => Teams.Contains(t.TeamId)));
    }

    if (Roles.Count > 0) {
      users = users.Where(u => u.Roles.Any(r => Roles.Contains(r.RoleId)));
    }

    if (SubjectFields.Count > 0) {
      users = users.Where(u => u.SubjectFields.Any(sf => SubjectFields.Contains(sf.SubjectFieldId)));
    }

    List<User> result = await users.ToListAsync();

    return Ok(result);
  }


}


