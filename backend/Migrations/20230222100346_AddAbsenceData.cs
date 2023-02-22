using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Lanekassen.Migrations
{
    /// <inheritdoc />
    public partial class AddAbsenceData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Absences",
                columns: new[] { "AbsenceId", "AbsenceTypeId", "Comment", "EndDate", "StartDate", "UserId" },
                values: new object[] { 756969, 746969, null, new DateTime(1, 1, 3, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), 666969 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Absences",
                keyColumn: "AbsenceId",
                keyValue: 756969);
        }
    }
}
