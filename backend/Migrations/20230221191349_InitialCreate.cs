using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Lanekassen.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AbsenceTypes",
                columns: table => new
                {
                    AbsenceTypeId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Code = table.Column<string>(type: "text", nullable: false),
                    ColorCode = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AbsenceTypes", x => x.AbsenceTypeId);
                });

            migrationBuilder.CreateTable(
                name: "Departments",
                columns: table => new
                {
                    DepartmentId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Abbreviation = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Departments", x => x.DepartmentId);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    RoleId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.RoleId);
                });

            migrationBuilder.CreateTable(
                name: "Sections",
                columns: table => new
                {
                    SectionId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sections", x => x.SectionId);
                });

            migrationBuilder.CreateTable(
                name: "Teams",
                columns: table => new
                {
                    TeamId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Teams", x => x.TeamId);
                });

            migrationBuilder.CreateTable(
                name: "SubjectFields",
                columns: table => new
                {
                    SubjectFieldId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    DepartmentId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubjectFields", x => x.SubjectFieldId);
                    table.ForeignKey(
                        name: "FK_SubjectFields_Departments_DepartmentId",
                        column: x => x.DepartmentId,
                        principalTable: "Departments",
                        principalColumn: "DepartmentId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DepartmentSection",
                columns: table => new
                {
                    DepartmentsDepartmentId = table.Column<int>(type: "integer", nullable: false),
                    SectionsSectionId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DepartmentSection", x => new { x.DepartmentsDepartmentId, x.SectionsSectionId });
                    table.ForeignKey(
                        name: "FK_DepartmentSection_Departments_DepartmentsDepartmentId",
                        column: x => x.DepartmentsDepartmentId,
                        principalTable: "Departments",
                        principalColumn: "DepartmentId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DepartmentSection_Sections_SectionsSectionId",
                        column: x => x.SectionsSectionId,
                        principalTable: "Sections",
                        principalColumn: "SectionId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    FirstName = table.Column<string>(type: "text", nullable: false),
                    LastName = table.Column<string>(type: "text", nullable: false),
                    UserId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Email = table.Column<string>(type: "text", nullable: false),
                    EmploymentType = table.Column<int>(type: "integer", nullable: false),
                    Admin = table.Column<bool>(type: "boolean", nullable: false),
                    SectionId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserId);
                    table.ForeignKey(
                        name: "FK_Users_Sections_SectionId",
                        column: x => x.SectionId,
                        principalTable: "Sections",
                        principalColumn: "SectionId");
                });

            migrationBuilder.CreateTable(
                name: "Absences",
                columns: table => new
                {
                    AbsenceId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    StartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    EndDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Comment = table.Column<string>(type: "text", nullable: true),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    AbsenceTypeId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Absences", x => x.AbsenceId);
                    table.ForeignKey(
                        name: "FK_Absences_AbsenceTypes_AbsenceTypeId",
                        column: x => x.AbsenceTypeId,
                        principalTable: "AbsenceTypes",
                        principalColumn: "AbsenceTypeId");
                    table.ForeignKey(
                        name: "FK_Absences_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RoleUser",
                columns: table => new
                {
                    RolesRoleId = table.Column<int>(type: "integer", nullable: false),
                    UsersUserId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoleUser", x => new { x.RolesRoleId, x.UsersUserId });
                    table.ForeignKey(
                        name: "FK_RoleUser_Roles_RolesRoleId",
                        column: x => x.RolesRoleId,
                        principalTable: "Roles",
                        principalColumn: "RoleId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RoleUser_Users_UsersUserId",
                        column: x => x.UsersUserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SubjectFieldUser",
                columns: table => new
                {
                    SubjectFieldsSubjectFieldId = table.Column<int>(type: "integer", nullable: false),
                    UsersUserId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubjectFieldUser", x => new { x.SubjectFieldsSubjectFieldId, x.UsersUserId });
                    table.ForeignKey(
                        name: "FK_SubjectFieldUser_SubjectFields_SubjectFieldsSubjectFieldId",
                        column: x => x.SubjectFieldsSubjectFieldId,
                        principalTable: "SubjectFields",
                        principalColumn: "SubjectFieldId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SubjectFieldUser_Users_UsersUserId",
                        column: x => x.UsersUserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TeamUser",
                columns: table => new
                {
                    TeamsTeamId = table.Column<int>(type: "integer", nullable: false),
                    UsersUserId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TeamUser", x => new { x.TeamsTeamId, x.UsersUserId });
                    table.ForeignKey(
                        name: "FK_TeamUser_Teams_TeamsTeamId",
                        column: x => x.TeamsTeamId,
                        principalTable: "Teams",
                        principalColumn: "TeamId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TeamUser_Users_UsersUserId",
                        column: x => x.UsersUserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AbsenceTypes",
                columns: new[] { "AbsenceTypeId", "Code", "ColorCode", "Name" },
                values: new object[,]
                {
                    { 746969, "T", "#bada55", "Tilgjengelig fravær" },
                    { 746970, "F", "#bada55", "Utilgjengelig fravær" },
                    { 746971, "P/S", "#bada55", "Permisjon/Sykmelding" }
                });

            migrationBuilder.InsertData(
                table: "Departments",
                columns: new[] { "DepartmentId", "Abbreviation", "Name" },
                values: new object[,]
                {
                    { 696969, "IT", "IT-avdelingen" },
                    { 696970, "UA", "Utdanningsstøtte" },
                    { 696971, "SAK", "Saksavdelingen" },
                    { 696972, "SØ", "Styring og Økonomi" },
                    { 696973, "KOM", "Kommunikasjonsstaben" },
                    { 696974, "HR", "HR og administrasjon" }
                });

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "RoleId", "Name" },
                values: new object[,]
                {
                    { 736969, "Arkitekt" },
                    { 736970, "Prosjektleder" },
                    { 736971, "App.Drift" },
                    { 736972, "Teamlead" },
                    { 736973, "Tester" },
                    { 736974, "Utvikler" },
                    { 736975, "Designer" },
                    { 736976, "Controller" },
                    { 736977, "Leder" }
                });

            migrationBuilder.InsertData(
                table: "Sections",
                columns: new[] { "SectionId", "Name" },
                values: new object[,]
                {
                    { 706969, "Trondheim" },
                    { 706970, "Oslo" },
                    { 706971, "Hjemmekollega" }
                });

            migrationBuilder.InsertData(
                table: "Teams",
                columns: new[] { "TeamId", "Name" },
                values: new object[,]
                {
                    { 726969, "Rubik" },
                    { 726970, "Settlers" },
                    { 726971, "Dominion" },
                    { 726972, "Portal" },
                    { 726973, "Pong" },
                    { 726974, "Test" },
                    { 726975, "Ledergruppe IT" },
                    { 726976, "Utvidet Ledergruppe IT" }
                });

            migrationBuilder.InsertData(
                table: "DepartmentSection",
                columns: new[] { "DepartmentsDepartmentId", "SectionsSectionId" },
                values: new object[,]
                {
                    { 696969, 706969 },
                    { 696969, 706970 },
                    { 696969, 706971 }
                });

            migrationBuilder.InsertData(
                table: "SubjectFields",
                columns: new[] { "SubjectFieldId", "DepartmentId", "Name" },
                values: new object[,]
                {
                    { 716969, 696969, "Virksomhetsarkitektur og Prosjektledelse" },
                    { 716970, 696969, "Applikasjonsdrift" },
                    { 716971, 696969, "Systemutvikling og test" },
                    { 716972, 696969, "Informasjonssikkerhet" },
                    { 716973, 696969, "Data og informasjonsforvaltning" },
                    { 716974, 696969, "Leverandørstyring og økonomi" },
                    { 716975, 696969, "Drift og avtaleeierskap" },
                    { 716976, 696969, "IT Brukerstøtte" },
                    { 716977, 696969, "Rekruttering og kompetanse" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "Admin", "Email", "EmploymentType", "FirstName", "LastName", "SectionId" },
                values: new object[] { 666969, false, "john@doe.com", 0, "John", "Doe", 706969 });

            migrationBuilder.InsertData(
                table: "RoleUser",
                columns: new[] { "RolesRoleId", "UsersUserId" },
                values: new object[] { 736969, 666969 });

            migrationBuilder.InsertData(
                table: "SubjectFieldUser",
                columns: new[] { "SubjectFieldsSubjectFieldId", "UsersUserId" },
                values: new object[] { 716969, 666969 });

            migrationBuilder.InsertData(
                table: "TeamUser",
                columns: new[] { "TeamsTeamId", "UsersUserId" },
                values: new object[] { 726969, 666969 });

            migrationBuilder.CreateIndex(
                name: "IX_Absences_AbsenceTypeId",
                table: "Absences",
                column: "AbsenceTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Absences_UserId",
                table: "Absences",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_DepartmentSection_SectionsSectionId",
                table: "DepartmentSection",
                column: "SectionsSectionId");

            migrationBuilder.CreateIndex(
                name: "IX_RoleUser_UsersUserId",
                table: "RoleUser",
                column: "UsersUserId");

            migrationBuilder.CreateIndex(
                name: "IX_SubjectFields_DepartmentId",
                table: "SubjectFields",
                column: "DepartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_SubjectFieldUser_UsersUserId",
                table: "SubjectFieldUser",
                column: "UsersUserId");

            migrationBuilder.CreateIndex(
                name: "IX_TeamUser_UsersUserId",
                table: "TeamUser",
                column: "UsersUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_SectionId",
                table: "Users",
                column: "SectionId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Absences");

            migrationBuilder.DropTable(
                name: "DepartmentSection");

            migrationBuilder.DropTable(
                name: "RoleUser");

            migrationBuilder.DropTable(
                name: "SubjectFieldUser");

            migrationBuilder.DropTable(
                name: "TeamUser");

            migrationBuilder.DropTable(
                name: "AbsenceTypes");

            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropTable(
                name: "SubjectFields");

            migrationBuilder.DropTable(
                name: "Teams");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Departments");

            migrationBuilder.DropTable(
                name: "Sections");
        }
    }
}
