using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Lanekassen.Migrations
{
    /// <inheritdoc />
    public partial class newInitialId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Departments_DepartmentId",
                table: "Users");

            migrationBuilder.DeleteData(
                table: "AbsenceTypes",
                keyColumn: "AbsenceTypeId",
                keyValue: 746970);

            migrationBuilder.DeleteData(
                table: "AbsenceTypes",
                keyColumn: "AbsenceTypeId",
                keyValue: 746971);

            migrationBuilder.DeleteData(
                table: "Absences",
                keyColumn: "AbsenceId",
                keyValue: 756969);

            migrationBuilder.DeleteData(
                table: "DepartmentRole",
                keyColumns: new[] { "DepartmentsDepartmentId", "RolesRoleId" },
                keyValues: new object[] { 696969, 736969 });

            migrationBuilder.DeleteData(
                table: "DepartmentRole",
                keyColumns: new[] { "DepartmentsDepartmentId", "RolesRoleId" },
                keyValues: new object[] { 696969, 736970 });

            migrationBuilder.DeleteData(
                table: "DepartmentRole",
                keyColumns: new[] { "DepartmentsDepartmentId", "RolesRoleId" },
                keyValues: new object[] { 696969, 736971 });

            migrationBuilder.DeleteData(
                table: "DepartmentRole",
                keyColumns: new[] { "DepartmentsDepartmentId", "RolesRoleId" },
                keyValues: new object[] { 696969, 736972 });

            migrationBuilder.DeleteData(
                table: "DepartmentRole",
                keyColumns: new[] { "DepartmentsDepartmentId", "RolesRoleId" },
                keyValues: new object[] { 696969, 736973 });

            migrationBuilder.DeleteData(
                table: "DepartmentRole",
                keyColumns: new[] { "DepartmentsDepartmentId", "RolesRoleId" },
                keyValues: new object[] { 696969, 736974 });

            migrationBuilder.DeleteData(
                table: "DepartmentRole",
                keyColumns: new[] { "DepartmentsDepartmentId", "RolesRoleId" },
                keyValues: new object[] { 696969, 736975 });

            migrationBuilder.DeleteData(
                table: "DepartmentRole",
                keyColumns: new[] { "DepartmentsDepartmentId", "RolesRoleId" },
                keyValues: new object[] { 696969, 736976 });

            migrationBuilder.DeleteData(
                table: "DepartmentRole",
                keyColumns: new[] { "DepartmentsDepartmentId", "RolesRoleId" },
                keyValues: new object[] { 696969, 736977 });

            migrationBuilder.DeleteData(
                table: "DepartmentSection",
                keyColumns: new[] { "DepartmentsDepartmentId", "SectionsSectionId" },
                keyValues: new object[] { 696969, 706969 });

            migrationBuilder.DeleteData(
                table: "DepartmentSection",
                keyColumns: new[] { "DepartmentsDepartmentId", "SectionsSectionId" },
                keyValues: new object[] { 696969, 706970 });

            migrationBuilder.DeleteData(
                table: "DepartmentSection",
                keyColumns: new[] { "DepartmentsDepartmentId", "SectionsSectionId" },
                keyValues: new object[] { 696969, 706971 });

            migrationBuilder.DeleteData(
                table: "DepartmentTeam",
                keyColumns: new[] { "DepartmentsDepartmentId", "TeamsTeamId" },
                keyValues: new object[] { 696969, 726969 });

            migrationBuilder.DeleteData(
                table: "DepartmentTeam",
                keyColumns: new[] { "DepartmentsDepartmentId", "TeamsTeamId" },
                keyValues: new object[] { 696969, 726970 });

            migrationBuilder.DeleteData(
                table: "DepartmentTeam",
                keyColumns: new[] { "DepartmentsDepartmentId", "TeamsTeamId" },
                keyValues: new object[] { 696969, 726971 });

            migrationBuilder.DeleteData(
                table: "DepartmentTeam",
                keyColumns: new[] { "DepartmentsDepartmentId", "TeamsTeamId" },
                keyValues: new object[] { 696969, 726972 });

            migrationBuilder.DeleteData(
                table: "DepartmentTeam",
                keyColumns: new[] { "DepartmentsDepartmentId", "TeamsTeamId" },
                keyValues: new object[] { 696969, 726973 });

            migrationBuilder.DeleteData(
                table: "DepartmentTeam",
                keyColumns: new[] { "DepartmentsDepartmentId", "TeamsTeamId" },
                keyValues: new object[] { 696969, 726974 });

            migrationBuilder.DeleteData(
                table: "DepartmentTeam",
                keyColumns: new[] { "DepartmentsDepartmentId", "TeamsTeamId" },
                keyValues: new object[] { 696969, 726975 });

            migrationBuilder.DeleteData(
                table: "DepartmentTeam",
                keyColumns: new[] { "DepartmentsDepartmentId", "TeamsTeamId" },
                keyValues: new object[] { 696969, 726976 });

            migrationBuilder.DeleteData(
                table: "Departments",
                keyColumn: "DepartmentId",
                keyValue: 696970);

            migrationBuilder.DeleteData(
                table: "Departments",
                keyColumn: "DepartmentId",
                keyValue: 696971);

            migrationBuilder.DeleteData(
                table: "Departments",
                keyColumn: "DepartmentId",
                keyValue: 696972);

            migrationBuilder.DeleteData(
                table: "Departments",
                keyColumn: "DepartmentId",
                keyValue: 696973);

            migrationBuilder.DeleteData(
                table: "Departments",
                keyColumn: "DepartmentId",
                keyValue: 696974);

            migrationBuilder.DeleteData(
                table: "RoleUser",
                keyColumns: new[] { "RolesRoleId", "UsersUserId" },
                keyValues: new object[] { 736969, 666969 });

            migrationBuilder.DeleteData(
                table: "SubjectFieldUser",
                keyColumns: new[] { "SubjectFieldsSubjectFieldId", "UsersUserId" },
                keyValues: new object[] { 716969, 666969 });

            migrationBuilder.DeleteData(
                table: "SubjectFields",
                keyColumn: "SubjectFieldId",
                keyValue: 716970);

            migrationBuilder.DeleteData(
                table: "SubjectFields",
                keyColumn: "SubjectFieldId",
                keyValue: 716971);

            migrationBuilder.DeleteData(
                table: "SubjectFields",
                keyColumn: "SubjectFieldId",
                keyValue: 716972);

            migrationBuilder.DeleteData(
                table: "SubjectFields",
                keyColumn: "SubjectFieldId",
                keyValue: 716973);

            migrationBuilder.DeleteData(
                table: "SubjectFields",
                keyColumn: "SubjectFieldId",
                keyValue: 716974);

            migrationBuilder.DeleteData(
                table: "SubjectFields",
                keyColumn: "SubjectFieldId",
                keyValue: 716975);

            migrationBuilder.DeleteData(
                table: "SubjectFields",
                keyColumn: "SubjectFieldId",
                keyValue: 716976);

            migrationBuilder.DeleteData(
                table: "SubjectFields",
                keyColumn: "SubjectFieldId",
                keyValue: 716977);

            migrationBuilder.DeleteData(
                table: "TeamUser",
                keyColumns: new[] { "TeamsTeamId", "UsersUserId" },
                keyValues: new object[] { 726969, 666969 });

            migrationBuilder.DeleteData(
                table: "AbsenceTypes",
                keyColumn: "AbsenceTypeId",
                keyValue: 746969);

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "RoleId",
                keyValue: 736969);

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "RoleId",
                keyValue: 736970);

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "RoleId",
                keyValue: 736971);

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "RoleId",
                keyValue: 736972);

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "RoleId",
                keyValue: 736973);

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "RoleId",
                keyValue: 736974);

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "RoleId",
                keyValue: 736975);

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "RoleId",
                keyValue: 736976);

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "RoleId",
                keyValue: 736977);

            migrationBuilder.DeleteData(
                table: "Sections",
                keyColumn: "SectionId",
                keyValue: 706970);

            migrationBuilder.DeleteData(
                table: "Sections",
                keyColumn: "SectionId",
                keyValue: 706971);

            migrationBuilder.DeleteData(
                table: "SubjectFields",
                keyColumn: "SubjectFieldId",
                keyValue: 716969);

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "TeamId",
                keyValue: 726969);

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "TeamId",
                keyValue: 726970);

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "TeamId",
                keyValue: 726971);

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "TeamId",
                keyValue: 726972);

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "TeamId",
                keyValue: 726973);

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "TeamId",
                keyValue: 726974);

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "TeamId",
                keyValue: 726975);

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "TeamId",
                keyValue: 726976);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 666969);

            migrationBuilder.DeleteData(
                table: "Departments",
                keyColumn: "DepartmentId",
                keyValue: 696969);

            migrationBuilder.DeleteData(
                table: "Sections",
                keyColumn: "SectionId",
                keyValue: 706969);

            migrationBuilder.AlterColumn<int>(
                name: "DepartmentId",
                table: "Users",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.InsertData(
                table: "AbsenceTypes",
                columns: new[] { "AbsenceTypeId", "Code", "ColorCode", "Name" },
                values: new object[,]
                {
                    { 1, "T", "#bada55", "Tilgjengelig fravær" },
                    { 2, "F", "#bada55", "Utilgjengelig fravær" },
                    { 3, "P/S", "#bada55", "Permisjon/Sykmelding" }
                });

            migrationBuilder.InsertData(
                table: "Departments",
                columns: new[] { "DepartmentId", "Abbreviation", "Name" },
                values: new object[,]
                {
                    { 1, "IT", "IT-avdelingen" },
                    { 2, "UA", "Utdanningsstøtte" },
                    { 3, "SAK", "Saksavdelingen" },
                    { 4, "SØ", "Styring og Økonomi" },
                    { 5, "KOM", "Kommunikasjonsstaben" },
                    { 6, "HR", "HR og administrasjon" }
                });

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "RoleId", "Name" },
                values: new object[,]
                {
                    { 1, "Arkitekt" },
                    { 2, "Prosjektleder" },
                    { 3, "App.Drift" },
                    { 4, "Teamlead" },
                    { 5, "Tester" },
                    { 6, "Utvikler" },
                    { 7, "Designer" },
                    { 8, "Controller" },
                    { 9, "Leder" }
                });

            migrationBuilder.InsertData(
                table: "Sections",
                columns: new[] { "SectionId", "Name" },
                values: new object[,]
                {
                    { 1, "Trondheim" },
                    { 2, "Oslo" },
                    { 3, "Hjemmekollega" }
                });

            migrationBuilder.InsertData(
                table: "Teams",
                columns: new[] { "TeamId", "Name" },
                values: new object[,]
                {
                    { 1, "Rubik" },
                    { 2, "Settlers" },
                    { 3, "Dominion" },
                    { 4, "Portal" },
                    { 5, "Pong" },
                    { 6, "Test" },
                    { 7, "Ledergruppe IT" },
                    { 8, "Utvidet Ledergruppe IT" }
                });

            migrationBuilder.InsertData(
                table: "DepartmentRole",
                columns: new[] { "DepartmentsDepartmentId", "RolesRoleId" },
                values: new object[,]
                {
                    { 1, 1 },
                    { 1, 2 },
                    { 1, 3 },
                    { 1, 4 },
                    { 1, 5 },
                    { 1, 6 },
                    { 1, 7 },
                    { 1, 8 },
                    { 1, 9 }
                });

            migrationBuilder.InsertData(
                table: "DepartmentSection",
                columns: new[] { "DepartmentsDepartmentId", "SectionsSectionId" },
                values: new object[,]
                {
                    { 1, 1 },
                    { 1, 2 },
                    { 1, 3 }
                });

            migrationBuilder.InsertData(
                table: "DepartmentTeam",
                columns: new[] { "DepartmentsDepartmentId", "TeamsTeamId" },
                values: new object[,]
                {
                    { 1, 1 },
                    { 1, 2 },
                    { 1, 3 },
                    { 1, 4 },
                    { 1, 5 },
                    { 1, 6 },
                    { 1, 7 },
                    { 1, 8 }
                });

            migrationBuilder.InsertData(
                table: "SubjectFields",
                columns: new[] { "SubjectFieldId", "DepartmentId", "Name" },
                values: new object[,]
                {
                    { 1, 1, "Virksomhetsarkitektur og Prosjektledelse" },
                    { 2, 1, "Applikasjonsdrift" },
                    { 3, 1, "Systemutvikling og test" },
                    { 4, 1, "Informasjonssikkerhet" },
                    { 5, 1, "Data og informasjonsforvaltning" },
                    { 6, 1, "Leverandørstyring og økonomi" },
                    { 7, 1, "Drift og avtaleeierskap" },
                    { 8, 1, "IT Brukerstøtte" },
                    { 9, 1, "Rekruttering og kompetanse" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "Admin", "AzureId", "DepartmentId", "Email", "EmploymentType", "FirstName", "LastName", "SectionId" },
                values: new object[] { 1, false, "This-is-a-fake-azure-id", 1, "john@doe.com", 0, "John", "Doe", 1 });

            migrationBuilder.InsertData(
                table: "Absences",
                columns: new[] { "AbsenceId", "AbsenceTypeId", "Comment", "EndDate", "StartDate", "UserId" },
                values: new object[] { 1, 1, null, new DateTime(1, 1, 3, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), 1 });

            migrationBuilder.InsertData(
                table: "RoleUser",
                columns: new[] { "RolesRoleId", "UsersUserId" },
                values: new object[] { 1, 1 });

            migrationBuilder.InsertData(
                table: "SubjectFieldUser",
                columns: new[] { "SubjectFieldsSubjectFieldId", "UsersUserId" },
                values: new object[] { 1, 1 });

            migrationBuilder.InsertData(
                table: "TeamUser",
                columns: new[] { "TeamsTeamId", "UsersUserId" },
                values: new object[] { 1, 1 });

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Departments_DepartmentId",
                table: "Users",
                column: "DepartmentId",
                principalTable: "Departments",
                principalColumn: "DepartmentId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Departments_DepartmentId",
                table: "Users");

            migrationBuilder.DeleteData(
                table: "AbsenceTypes",
                keyColumn: "AbsenceTypeId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "AbsenceTypes",
                keyColumn: "AbsenceTypeId",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Absences",
                keyColumn: "AbsenceId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "DepartmentRole",
                keyColumns: new[] { "DepartmentsDepartmentId", "RolesRoleId" },
                keyValues: new object[] { 1, 1 });

            migrationBuilder.DeleteData(
                table: "DepartmentRole",
                keyColumns: new[] { "DepartmentsDepartmentId", "RolesRoleId" },
                keyValues: new object[] { 1, 2 });

            migrationBuilder.DeleteData(
                table: "DepartmentRole",
                keyColumns: new[] { "DepartmentsDepartmentId", "RolesRoleId" },
                keyValues: new object[] { 1, 3 });

            migrationBuilder.DeleteData(
                table: "DepartmentRole",
                keyColumns: new[] { "DepartmentsDepartmentId", "RolesRoleId" },
                keyValues: new object[] { 1, 4 });

            migrationBuilder.DeleteData(
                table: "DepartmentRole",
                keyColumns: new[] { "DepartmentsDepartmentId", "RolesRoleId" },
                keyValues: new object[] { 1, 5 });

            migrationBuilder.DeleteData(
                table: "DepartmentRole",
                keyColumns: new[] { "DepartmentsDepartmentId", "RolesRoleId" },
                keyValues: new object[] { 1, 6 });

            migrationBuilder.DeleteData(
                table: "DepartmentRole",
                keyColumns: new[] { "DepartmentsDepartmentId", "RolesRoleId" },
                keyValues: new object[] { 1, 7 });

            migrationBuilder.DeleteData(
                table: "DepartmentRole",
                keyColumns: new[] { "DepartmentsDepartmentId", "RolesRoleId" },
                keyValues: new object[] { 1, 8 });

            migrationBuilder.DeleteData(
                table: "DepartmentRole",
                keyColumns: new[] { "DepartmentsDepartmentId", "RolesRoleId" },
                keyValues: new object[] { 1, 9 });

            migrationBuilder.DeleteData(
                table: "DepartmentSection",
                keyColumns: new[] { "DepartmentsDepartmentId", "SectionsSectionId" },
                keyValues: new object[] { 1, 1 });

            migrationBuilder.DeleteData(
                table: "DepartmentSection",
                keyColumns: new[] { "DepartmentsDepartmentId", "SectionsSectionId" },
                keyValues: new object[] { 1, 2 });

            migrationBuilder.DeleteData(
                table: "DepartmentSection",
                keyColumns: new[] { "DepartmentsDepartmentId", "SectionsSectionId" },
                keyValues: new object[] { 1, 3 });

            migrationBuilder.DeleteData(
                table: "DepartmentTeam",
                keyColumns: new[] { "DepartmentsDepartmentId", "TeamsTeamId" },
                keyValues: new object[] { 1, 1 });

            migrationBuilder.DeleteData(
                table: "DepartmentTeam",
                keyColumns: new[] { "DepartmentsDepartmentId", "TeamsTeamId" },
                keyValues: new object[] { 1, 2 });

            migrationBuilder.DeleteData(
                table: "DepartmentTeam",
                keyColumns: new[] { "DepartmentsDepartmentId", "TeamsTeamId" },
                keyValues: new object[] { 1, 3 });

            migrationBuilder.DeleteData(
                table: "DepartmentTeam",
                keyColumns: new[] { "DepartmentsDepartmentId", "TeamsTeamId" },
                keyValues: new object[] { 1, 4 });

            migrationBuilder.DeleteData(
                table: "DepartmentTeam",
                keyColumns: new[] { "DepartmentsDepartmentId", "TeamsTeamId" },
                keyValues: new object[] { 1, 5 });

            migrationBuilder.DeleteData(
                table: "DepartmentTeam",
                keyColumns: new[] { "DepartmentsDepartmentId", "TeamsTeamId" },
                keyValues: new object[] { 1, 6 });

            migrationBuilder.DeleteData(
                table: "DepartmentTeam",
                keyColumns: new[] { "DepartmentsDepartmentId", "TeamsTeamId" },
                keyValues: new object[] { 1, 7 });

            migrationBuilder.DeleteData(
                table: "DepartmentTeam",
                keyColumns: new[] { "DepartmentsDepartmentId", "TeamsTeamId" },
                keyValues: new object[] { 1, 8 });

            migrationBuilder.DeleteData(
                table: "Departments",
                keyColumn: "DepartmentId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Departments",
                keyColumn: "DepartmentId",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Departments",
                keyColumn: "DepartmentId",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Departments",
                keyColumn: "DepartmentId",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Departments",
                keyColumn: "DepartmentId",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "RoleUser",
                keyColumns: new[] { "RolesRoleId", "UsersUserId" },
                keyValues: new object[] { 1, 1 });

            migrationBuilder.DeleteData(
                table: "SubjectFieldUser",
                keyColumns: new[] { "SubjectFieldsSubjectFieldId", "UsersUserId" },
                keyValues: new object[] { 1, 1 });

            migrationBuilder.DeleteData(
                table: "SubjectFields",
                keyColumn: "SubjectFieldId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "SubjectFields",
                keyColumn: "SubjectFieldId",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "SubjectFields",
                keyColumn: "SubjectFieldId",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "SubjectFields",
                keyColumn: "SubjectFieldId",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "SubjectFields",
                keyColumn: "SubjectFieldId",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "SubjectFields",
                keyColumn: "SubjectFieldId",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "SubjectFields",
                keyColumn: "SubjectFieldId",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "SubjectFields",
                keyColumn: "SubjectFieldId",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "TeamUser",
                keyColumns: new[] { "TeamsTeamId", "UsersUserId" },
                keyValues: new object[] { 1, 1 });

            migrationBuilder.DeleteData(
                table: "AbsenceTypes",
                keyColumn: "AbsenceTypeId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "RoleId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "RoleId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "RoleId",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "RoleId",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "RoleId",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "RoleId",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "RoleId",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "RoleId",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "RoleId",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Sections",
                keyColumn: "SectionId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Sections",
                keyColumn: "SectionId",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "SubjectFields",
                keyColumn: "SubjectFieldId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "TeamId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "TeamId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "TeamId",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "TeamId",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "TeamId",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "TeamId",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "TeamId",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "TeamId",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Departments",
                keyColumn: "DepartmentId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Sections",
                keyColumn: "SectionId",
                keyValue: 1);

            migrationBuilder.AlterColumn<int>(
                name: "DepartmentId",
                table: "Users",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

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
                table: "DepartmentSection",
                columns: new[] { "DepartmentsDepartmentId", "SectionsSectionId" },
                values: new object[,]
                {
                    { 696969, 706969 },
                    { 696969, 706970 },
                    { 696969, 706971 }
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
                columns: new[] { "UserId", "Admin", "AzureId", "DepartmentId", "Email", "EmploymentType", "FirstName", "LastName", "SectionId" },
                values: new object[] { 666969, false, "This-is-a-fake-azure-id", 696969, "john@doe.com", 0, "John", "Doe", 706969 });

            migrationBuilder.InsertData(
                table: "Absences",
                columns: new[] { "AbsenceId", "AbsenceTypeId", "Comment", "EndDate", "StartDate", "UserId" },
                values: new object[] { 756969, 746969, null, new DateTime(1, 1, 3, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), 666969 });

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

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Departments_DepartmentId",
                table: "Users",
                column: "DepartmentId",
                principalTable: "Departments",
                principalColumn: "DepartmentId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
