using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Lanekassen.Migrations
{
    /// <inheritdoc />
    public partial class teamAndRoleRelation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DepartmentRole",
                columns: table => new
                {
                    DepartmentsDepartmentId = table.Column<int>(type: "integer", nullable: false),
                    RolesRoleId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DepartmentRole", x => new { x.DepartmentsDepartmentId, x.RolesRoleId });
                    table.ForeignKey(
                        name: "FK_DepartmentRole_Departments_DepartmentsDepartmentId",
                        column: x => x.DepartmentsDepartmentId,
                        principalTable: "Departments",
                        principalColumn: "DepartmentId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DepartmentRole_Roles_RolesRoleId",
                        column: x => x.RolesRoleId,
                        principalTable: "Roles",
                        principalColumn: "RoleId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DepartmentTeam",
                columns: table => new
                {
                    DepartmentsDepartmentId = table.Column<int>(type: "integer", nullable: false),
                    TeamsTeamId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DepartmentTeam", x => new { x.DepartmentsDepartmentId, x.TeamsTeamId });
                    table.ForeignKey(
                        name: "FK_DepartmentTeam_Departments_DepartmentsDepartmentId",
                        column: x => x.DepartmentsDepartmentId,
                        principalTable: "Departments",
                        principalColumn: "DepartmentId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DepartmentTeam_Teams_TeamsTeamId",
                        column: x => x.TeamsTeamId,
                        principalTable: "Teams",
                        principalColumn: "TeamId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "DepartmentRole",
                columns: new[] { "DepartmentsDepartmentId", "RolesRoleId" },
                values: new object[,]
                {
                    { 696969, 736969 },
                    { 696969, 736970 },
                    { 696969, 736971 },
                    { 696969, 736972 },
                    { 696969, 736973 },
                    { 696969, 736974 },
                    { 696969, 736975 },
                    { 696969, 736976 },
                    { 696969, 736977 }
                });

            migrationBuilder.InsertData(
                table: "DepartmentTeam",
                columns: new[] { "DepartmentsDepartmentId", "TeamsTeamId" },
                values: new object[,]
                {
                    { 696969, 726969 },
                    { 696969, 726970 },
                    { 696969, 726971 },
                    { 696969, 726972 },
                    { 696969, 726973 },
                    { 696969, 726974 },
                    { 696969, 726975 },
                    { 696969, 726976 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_DepartmentRole_RolesRoleId",
                table: "DepartmentRole",
                column: "RolesRoleId");

            migrationBuilder.CreateIndex(
                name: "IX_DepartmentTeam_TeamsTeamId",
                table: "DepartmentTeam",
                column: "TeamsTeamId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DepartmentRole");

            migrationBuilder.DropTable(
                name: "DepartmentTeam");
        }
    }
}
