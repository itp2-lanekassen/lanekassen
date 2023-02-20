using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Lanekassen.Migrations
{
    /// <inheritdoc />
    public partial class InititalCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AbsenceType",
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
                    table.PrimaryKey("PK_AbsenceType", x => x.AbsenceTypeId);
                });

            migrationBuilder.CreateTable(
                name: "Department",
                columns: table => new
                {
                    DepartmentId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Abbreviation = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Department", x => x.DepartmentId);
                });

            migrationBuilder.CreateTable(
                name: "Role",
                columns: table => new
                {
                    RoleId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Role", x => x.RoleId);
                });

            migrationBuilder.CreateTable(
                name: "Section",
                columns: table => new
                {
                    SectionId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Section", x => x.SectionId);
                });

            migrationBuilder.CreateTable(
                name: "Team",
                columns: table => new
                {
                    TeamId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Team", x => x.TeamId);
                });

            migrationBuilder.CreateTable(
                name: "SubjectField",
                columns: table => new
                {
                    SubjectFieldId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    DepartmentId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubjectField", x => x.SubjectFieldId);
                    table.ForeignKey(
                        name: "FK_SubjectField_Department_DepartmentId",
                        column: x => x.DepartmentId,
                        principalTable: "Department",
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
                        name: "FK_DepartmentSection_Department_DepartmentsDepartmentId",
                        column: x => x.DepartmentsDepartmentId,
                        principalTable: "Department",
                        principalColumn: "DepartmentId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DepartmentSection_Section_SectionsSectionId",
                        column: x => x.SectionsSectionId,
                        principalTable: "Section",
                        principalColumn: "SectionId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FirstName = table.Column<string>(type: "text", nullable: false),
                    LastName = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    EmploymentType = table.Column<int>(type: "integer", nullable: false),
                    Admin = table.Column<bool>(type: "boolean", nullable: false),
                    SectionId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.UserId);
                    table.ForeignKey(
                        name: "FK_User_Section_SectionId",
                        column: x => x.SectionId,
                        principalTable: "Section",
                        principalColumn: "SectionId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Absence",
                columns: table => new
                {
                    AbsenceId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    StartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    EndDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Comment = table.Column<string>(type: "text", nullable: true),
                    TypeAbsenceTypeId = table.Column<int>(type: "integer", nullable: false),
                    UserId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Absence", x => x.AbsenceId);
                    table.ForeignKey(
                        name: "FK_Absence_AbsenceType_TypeAbsenceTypeId",
                        column: x => x.TypeAbsenceTypeId,
                        principalTable: "AbsenceType",
                        principalColumn: "AbsenceTypeId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Absence_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
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
                        name: "FK_RoleUser_Role_RolesRoleId",
                        column: x => x.RolesRoleId,
                        principalTable: "Role",
                        principalColumn: "RoleId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RoleUser_User_UsersUserId",
                        column: x => x.UsersUserId,
                        principalTable: "User",
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
                        name: "FK_SubjectFieldUser_SubjectField_SubjectFieldsSubjectFieldId",
                        column: x => x.SubjectFieldsSubjectFieldId,
                        principalTable: "SubjectField",
                        principalColumn: "SubjectFieldId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SubjectFieldUser_User_UsersUserId",
                        column: x => x.UsersUserId,
                        principalTable: "User",
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
                        name: "FK_TeamUser_Team_TeamsTeamId",
                        column: x => x.TeamsTeamId,
                        principalTable: "Team",
                        principalColumn: "TeamId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TeamUser_User_UsersUserId",
                        column: x => x.UsersUserId,
                        principalTable: "User",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AbsenceType",
                columns: new[] { "AbsenceTypeId", "Code", "ColorCode", "Name" },
                values: new object[,]
                {
                    { 746969, "T", "", "Tilgjengelig fravær" },
                    { 746970, "F", "", "Utilgjengelig fravær" },
                    { 746971, "P/S", "", "Permisjon/Sykmelding" }
                });

            migrationBuilder.InsertData(
                table: "Department",
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
                table: "Role",
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
                table: "Section",
                columns: new[] { "SectionId", "Name" },
                values: new object[,]
                {
                    { 706969, "Trondheim" },
                    { 706970, "Oslo" },
                    { 706971, "Hjemmekollega" }
                });

            migrationBuilder.InsertData(
                table: "Team",
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
                table: "SubjectField",
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
                table: "User",
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
                name: "IX_Absence_TypeAbsenceTypeId",
                table: "Absence",
                column: "TypeAbsenceTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Absence_UserId",
                table: "Absence",
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
                name: "IX_SubjectField_DepartmentId",
                table: "SubjectField",
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
                name: "IX_User_SectionId",
                table: "User",
                column: "SectionId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Absence");

            migrationBuilder.DropTable(
                name: "DepartmentSection");

            migrationBuilder.DropTable(
                name: "RoleUser");

            migrationBuilder.DropTable(
                name: "SubjectFieldUser");

            migrationBuilder.DropTable(
                name: "TeamUser");

            migrationBuilder.DropTable(
                name: "AbsenceType");

            migrationBuilder.DropTable(
                name: "Role");

            migrationBuilder.DropTable(
                name: "SubjectField");

            migrationBuilder.DropTable(
                name: "Team");

            migrationBuilder.DropTable(
                name: "User");

            migrationBuilder.DropTable(
                name: "Department");

            migrationBuilder.DropTable(
                name: "Section");
        }
    }
}
