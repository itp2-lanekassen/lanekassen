using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Lanekassen.Migrations
{
    /// <inheritdoc />
    public partial class isApprovedBoolean : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsApproved",
                table: "Absences",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.UpdateData(
                table: "Absences",
                keyColumn: "AbsenceId",
                keyValue: 1,
                column: "IsApproved",
                value: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsApproved",
                table: "Absences");
        }
    }
}
