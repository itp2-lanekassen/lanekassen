using Lanekassen.Database;
using Lanekassen.Models;
using Lanekassen.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Lanekassen.Controllers {
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

      var section = await _context.Sections.FindAsync(user.SectionId);
      if (section == null) {
        return BadRequest("Invalid section id");
      }

      var newUser = new User {
        FirstName = user.FirstName,
        LastName = user.LastName,
        Email = user.Email,
        EmploymentType = user.EmploymentType,
        Admin = user.Admin,
        Section = section,
        SubjectFields = await _context.SubjectFields.Where(sf => user.SubjectFields.Contains(sf.SubjectFieldId)).ToListAsync(),
        Roles = await _context.Roles.Where(r => user.Roles.Contains(r.RoleId)).ToListAsync(),
        Teams = await _context.Teams.Where(t => user.Teams.Contains(t.TeamId)).ToListAsync(),
        Absences = await _context.Absences.Where(a => user.Absences.Contains(a.AbsenceId)).ToListAsync(),
      };

      try {
        _context.Users.Add(newUser);
        await _context.SaveChangesAsync();
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
      var users = await _context.Users.ToListAsync();
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

      var section = await _context.Sections.FindAsync(user.SectionId);
      if (section == null) {
        return BadRequest("Invalid section id");
      }

      var userToUpdate = await _context.Users.FindAsync(id);
      if (userToUpdate == null) {
        return NotFound();
      }

      userToUpdate.FirstName = user.FirstName;
      userToUpdate.LastName = user.LastName;
      userToUpdate.Email = user.Email;
      userToUpdate.EmploymentType = user.EmploymentType;
      userToUpdate.Admin = user.Admin;
      userToUpdate.Section = section;
      userToUpdate.SubjectFields = await _context.SubjectFields.Where(sf => user.SubjectFields.Contains(sf.SubjectFieldId)).ToListAsync();
      userToUpdate.Roles = await _context.Roles.Where(r => user.Roles.Contains(r.RoleId)).ToListAsync();
      userToUpdate.Teams = await _context.Teams.Where(t => user.Teams.Contains(t.TeamId)).ToListAsync();
      userToUpdate.Absences = await _context.Absences.Where(a => user.Absences.Contains(a.AbsenceId)).ToListAsync();

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
      var userToDelete = await _context.Users.FindAsync(id);
      if (userToDelete == null) {
        return NotFound();
      }

      try {
        _context.Users.Remove(userToDelete);
        await _context.SaveChangesAsync();
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
      var user = await _context.Users.FindAsync(id);
      if (user == null) {
        return NotFound();
      }
      return Ok(user);
    }


  }
}

