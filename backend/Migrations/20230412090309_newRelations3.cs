using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Lanekassen.Migrations
{
    /// <inheritdoc />
    public partial class newRelations3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Teams_Departments_DepartmentId",
                table: "Teams");

            migrationBuilder.DropIndex(
                name: "IX_Teams_DepartmentId",
                table: "Teams");

            migrationBuilder.DropColumn(
                name: "DepartmentId",
                table: "Teams");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DepartmentId",
                table: "Teams",
                type: "integer",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Teams",
                keyColumn: "TeamId",
                keyValue: 1,
                column: "DepartmentId",
                value: null);

            migrationBuilder.UpdateData(
                table: "Teams",
                keyColumn: "TeamId",
                keyValue: 2,
                column: "DepartmentId",
                value: null);

            migrationBuilder.UpdateData(
                table: "Teams",
                keyColumn: "TeamId",
                keyValue: 3,
                column: "DepartmentId",
                value: null);

            migrationBuilder.UpdateData(
                table: "Teams",
                keyColumn: "TeamId",
                keyValue: 4,
                column: "DepartmentId",
                value: null);

            migrationBuilder.UpdateData(
                table: "Teams",
                keyColumn: "TeamId",
                keyValue: 5,
                column: "DepartmentId",
                value: null);

            migrationBuilder.UpdateData(
                table: "Teams",
                keyColumn: "TeamId",
                keyValue: 6,
                column: "DepartmentId",
                value: null);

            migrationBuilder.UpdateData(
                table: "Teams",
                keyColumn: "TeamId",
                keyValue: 7,
                column: "DepartmentId",
                value: null);

            migrationBuilder.UpdateData(
                table: "Teams",
                keyColumn: "TeamId",
                keyValue: 8,
                column: "DepartmentId",
                value: null);

            migrationBuilder.CreateIndex(
                name: "IX_Teams_DepartmentId",
                table: "Teams",
                column: "DepartmentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Teams_Departments_DepartmentId",
                table: "Teams",
                column: "DepartmentId",
                principalTable: "Departments",
                principalColumn: "DepartmentId");
        }
    }
}
