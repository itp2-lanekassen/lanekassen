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


  // [HttpPost]
  // public IActionResult CreateUser([FromBody] UserDTO user) {
  //     Section? section = _context.Sections.Find(user.SectionId);
  //     ICollection<SubjectField> subjectFields = _context.SubjectFields.Where(s => user.SubjectFields.Contains(s.SubjectFieldId)).ToList();
  //     ICollection<Role> roles = _context.Roles.Where(r => user.Roles!.Contains(r.RoleId)).ToList();
  //     ICollection<Team> teams = _context.Teams.Where(t => user.Teams!.Contains(t.TeamId)).ToList();
  //     ICollection<Absence> absences = _context.Absences.Where(a => user.Absences!.Contains(a.AbsenceId)).ToList();

  //     if (section == null) {
  //         // handle error
  //         throw new Exception("Section not found");
  //     }

  //     var newUser = new User {
  //         FirstName = user.FirstName,
  //         LastName = user.LastName,
  //         Email = user.Email,
  //         EmploymentType = user.EmploymentType,
  //         Admin = user.Admin,
  //         Section = section,
  //         // SubjectFields = subjectFields,
  //         // Roles = roles,
  //         // Teams = teams,
  //         // Absences = absences
  //     };

  //     _context.Users.Add(newUser);


  //     try {
  //         foreach (var field in subjectFields) {
  //             Console.WriteLine(field);
  //             newUser.SubjectFields.Add(field);
  //         }
  //     } catch {
  //         Console.WriteLine("Oops");
  //     }


  //     foreach (var role in roles) {
  //         newUser.Roles!.Add(role);   
  //     }

  //     foreach (var team in teams) {
  //         newUser.Teams!.Add(team);
  //     }

  //     foreach (var absence in absences) {
  //         newUser.Absences!.Add(absence);
  //     }

  //     _context.SaveChanges();
  //     return Ok();
  // }

  [HttpGet]
  public IActionResult GetUsers() {
    List<User> users = _context.Users.ToList();

    foreach (User user in users) {
      _context.Entry(user).Reference(user => user.Section).Load();
      _context.Entry(user).Collection(user => user.SubjectFields).Load();
    }

    return Ok(users);
  }
}