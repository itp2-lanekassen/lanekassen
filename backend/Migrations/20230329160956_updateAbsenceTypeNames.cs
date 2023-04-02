using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Lanekassen.Migrations
{
    /// <inheritdoc />
    public partial class updateAbsenceTypeNames : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AbsenceTypes",
                keyColumn: "AbsenceTypeId",
                keyValue: 1,
                column: "Name",
                value: "Tilgjengelig");

            migrationBuilder.UpdateData(
                table: "AbsenceTypes",
                keyColumn: "AbsenceTypeId",
                keyValue: 2,
                column: "Name",
                value: "Utilgjengelig");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AbsenceTypes",
                keyColumn: "AbsenceTypeId",
                keyValue: 1,
                column: "Name",
                value: "Tilgjengelig fravær");

            migrationBuilder.UpdateData(
                table: "AbsenceTypes",
                keyColumn: "AbsenceTypeId",
                keyValue: 2,
                column: "Name",
                value: "Utilgjengelig fravær");
        }
    }
}
