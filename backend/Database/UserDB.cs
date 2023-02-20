using Lanekassen.Database;
using Lanekassen.Models; 
using Microsoft.EntityFrameworkCore;

class UserCRUD
{
    static void Main(string[] args)
    {
        // connect to postgresql database
        var connectionString = "Host=localhost;Port=5432;Database=lanekassen;Username=lanekassen_admin;Password=lanekassen-2023";
        // bruke env variabler i framtiden
        var options = new DbContextOptionsBuilder<ApiDbContext>()
            .UseNpgsql(connectionString)
            .Options;

        

        // create a new user
/*         var user = new User (
            1,
            "John",
            "Doe",
            "john@doe.no",
            d,
            false,
            new Section {
                Name = "IT-section",
            },
            new List<SubjectField> {
                new SubjectField {
                    Name = "IT-subject",
                    Department = new Department {
                        Name = "IT-department",
                        Abbreviation = "IT"
                    }
                }
            },
            new List<Role> {
                new Role {
                    Name = "IT-role",
                }
            },
            new List<Team> {
                new Team {
                    Name = "IT-team",
                }
            },
            new List<Absence> {
                new Absence {
                    Type = new AbsenceType {
                        Name = "Ferie",
                    }
                }
            }
        ); */

        // add user to database
/*         using (var context = new ApiDbContext(options)) {
            context.Database.EnsureCreated();
            context.Users.Add(user);
            context.SaveChanges();
        } */



        
    }
}