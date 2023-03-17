using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Lanekassen.Migrations
{
    /// <inheritdoc />
    public partial class ChangeAbsenceTypeColor : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AbsenceTypes",
                keyColumn: "AbsenceTypeId",
                keyValue: 3,
                column: "ColorCode",
                value: "#eb9900");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AbsenceTypes",
                keyColumn: "AbsenceTypeId",
                keyValue: 3,
                column: "ColorCode",
                value: "#0700cf");
        }
    }
}
