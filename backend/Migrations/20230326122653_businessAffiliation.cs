using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Lanekassen.Migrations
{
    /// <inheritdoc />
    public partial class businessAffiliation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "BusinessAffiliation",
                table: "Users",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 1,
                column: "BusinessAffiliation",
                value: "Lånekassen");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BusinessAffiliation",
                table: "Users");
        }
    }
}
