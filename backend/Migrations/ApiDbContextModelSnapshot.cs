﻿// <auto-generated />
using System;
using Lanekassen.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Lanekassen.Migrations
{
    [DbContext(typeof(ApiDbContext))]
    partial class ApiDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("DepartmentRole", b =>
                {
                    b.Property<int>("DepartmentsDepartmentId")
                        .HasColumnType("integer");

                    b.Property<int>("RolesRoleId")
                        .HasColumnType("integer");

                    b.HasKey("DepartmentsDepartmentId", "RolesRoleId");

                    b.HasIndex("RolesRoleId");

                    b.ToTable("DepartmentRole");

                    b.HasData(
                        new
                        {
                            DepartmentsDepartmentId = 1,
                            RolesRoleId = 1
                        },
                        new
                        {
                            DepartmentsDepartmentId = 1,
                            RolesRoleId = 2
                        },
                        new
                        {
                            DepartmentsDepartmentId = 1,
                            RolesRoleId = 3
                        },
                        new
                        {
                            DepartmentsDepartmentId = 1,
                            RolesRoleId = 4
                        },
                        new
                        {
                            DepartmentsDepartmentId = 1,
                            RolesRoleId = 5
                        },
                        new
                        {
                            DepartmentsDepartmentId = 1,
                            RolesRoleId = 6
                        },
                        new
                        {
                            DepartmentsDepartmentId = 1,
                            RolesRoleId = 7
                        },
                        new
                        {
                            DepartmentsDepartmentId = 1,
                            RolesRoleId = 8
                        },
                        new
                        {
                            DepartmentsDepartmentId = 1,
                            RolesRoleId = 9
                        });
                });

            modelBuilder.Entity("DepartmentSection", b =>
                {
                    b.Property<int>("DepartmentsDepartmentId")
                        .HasColumnType("integer");

                    b.Property<int>("SectionsSectionId")
                        .HasColumnType("integer");

                    b.HasKey("DepartmentsDepartmentId", "SectionsSectionId");

                    b.HasIndex("SectionsSectionId");

                    b.ToTable("DepartmentSection");

                    b.HasData(
                        new
                        {
                            DepartmentsDepartmentId = 1,
                            SectionsSectionId = 1
                        },
                        new
                        {
                            DepartmentsDepartmentId = 1,
                            SectionsSectionId = 2
                        },
                        new
                        {
                            DepartmentsDepartmentId = 1,
                            SectionsSectionId = 3
                        });
                });

            modelBuilder.Entity("DepartmentTeam", b =>
                {
                    b.Property<int>("DepartmentsDepartmentId")
                        .HasColumnType("integer");

                    b.Property<int>("TeamsTeamId")
                        .HasColumnType("integer");

                    b.HasKey("DepartmentsDepartmentId", "TeamsTeamId");

                    b.HasIndex("TeamsTeamId");

                    b.ToTable("DepartmentTeam");

                    b.HasData(
                        new
                        {
                            DepartmentsDepartmentId = 1,
                            TeamsTeamId = 1
                        },
                        new
                        {
                            DepartmentsDepartmentId = 1,
                            TeamsTeamId = 2
                        },
                        new
                        {
                            DepartmentsDepartmentId = 1,
                            TeamsTeamId = 3
                        },
                        new
                        {
                            DepartmentsDepartmentId = 1,
                            TeamsTeamId = 4
                        },
                        new
                        {
                            DepartmentsDepartmentId = 1,
                            TeamsTeamId = 5
                        },
                        new
                        {
                            DepartmentsDepartmentId = 1,
                            TeamsTeamId = 6
                        },
                        new
                        {
                            DepartmentsDepartmentId = 1,
                            TeamsTeamId = 7
                        },
                        new
                        {
                            DepartmentsDepartmentId = 1,
                            TeamsTeamId = 8
                        });
                });

            modelBuilder.Entity("Lanekassen.Models.Absence", b =>
                {
                    b.Property<int>("AbsenceId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("AbsenceId"));

                    b.Property<int?>("AbsenceTypeId")
                        .HasColumnType("integer");

                    b.Property<string>("Comment")
                        .HasColumnType("text");

                    b.Property<DateTime>("EndDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<bool>("IsApproved")
                        .HasColumnType("boolean");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("AbsenceId");

                    b.HasIndex("AbsenceTypeId");

                    b.HasIndex("UserId");

                    b.ToTable("Absences");

                    b.HasData(
                        new
                        {
                            AbsenceId = 1,
                            AbsenceTypeId = 1,
                            EndDate = new DateTime(1, 1, 3, 0, 0, 0, 0, DateTimeKind.Utc),
                            IsApproved = true,
                            StartDate = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc),
                            UserId = 1
                        });
                });

            modelBuilder.Entity("Lanekassen.Models.AbsenceType", b =>
                {
                    b.Property<int>("AbsenceTypeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("AbsenceTypeId"));

                    b.Property<string>("Code")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("ColorCode")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("AbsenceTypeId");

                    b.ToTable("AbsenceTypes");

                    b.HasData(
                        new
                        {
                            AbsenceTypeId = 1,
                            Code = "T",
                            ColorCode = "#00b500",
                            Name = "Tilgjengelig fravær"
                        },
                        new
                        {
                            AbsenceTypeId = 2,
                            Code = "F",
                            ColorCode = "#d90404",
                            Name = "Utilgjengelig fravær"
                        },
                        new
                        {
                            AbsenceTypeId = 3,
                            Code = "P/S",
                            ColorCode = "#eb9900",
                            Name = "Permisjon/Sykmelding"
                        });
                });

            modelBuilder.Entity("Lanekassen.Models.Department", b =>
                {
                    b.Property<int>("DepartmentId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("DepartmentId"));

                    b.Property<string>("Abbreviation")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("DepartmentId");

                    b.ToTable("Departments");

                    b.HasData(
                        new
                        {
                            DepartmentId = 1,
                            Abbreviation = "IT",
                            Name = "IT-avdelingen"
                        },
                        new
                        {
                            DepartmentId = 2,
                            Abbreviation = "UA",
                            Name = "Utdanningsstøtte"
                        },
                        new
                        {
                            DepartmentId = 3,
                            Abbreviation = "SAK",
                            Name = "Saksavdelingen"
                        },
                        new
                        {
                            DepartmentId = 4,
                            Abbreviation = "SØ",
                            Name = "Styring og Økonomi"
                        },
                        new
                        {
                            DepartmentId = 5,
                            Abbreviation = "KOM",
                            Name = "Kommunikasjonsstaben"
                        },
                        new
                        {
                            DepartmentId = 6,
                            Abbreviation = "HR",
                            Name = "HR og administrasjon"
                        });
                });

            modelBuilder.Entity("Lanekassen.Models.Role", b =>
                {
                    b.Property<int>("RoleId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("RoleId"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("RoleId");

                    b.ToTable("Roles");

                    b.HasData(
                        new
                        {
                            RoleId = 1,
                            Name = "Arkitekt"
                        },
                        new
                        {
                            RoleId = 2,
                            Name = "Prosjektleder"
                        },
                        new
                        {
                            RoleId = 3,
                            Name = "App.Drift"
                        },
                        new
                        {
                            RoleId = 4,
                            Name = "Teamlead"
                        },
                        new
                        {
                            RoleId = 5,
                            Name = "Tester"
                        },
                        new
                        {
                            RoleId = 6,
                            Name = "Utvikler"
                        },
                        new
                        {
                            RoleId = 7,
                            Name = "Designer"
                        },
                        new
                        {
                            RoleId = 8,
                            Name = "Controller"
                        },
                        new
                        {
                            RoleId = 9,
                            Name = "Leder"
                        });
                });

            modelBuilder.Entity("Lanekassen.Models.Section", b =>
                {
                    b.Property<int>("SectionId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("SectionId"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("SectionId");

                    b.ToTable("Sections");

                    b.HasData(
                        new
                        {
                            SectionId = 1,
                            Name = "Trondheim"
                        },
                        new
                        {
                            SectionId = 2,
                            Name = "Oslo"
                        },
                        new
                        {
                            SectionId = 3,
                            Name = "Hjemmekollega"
                        });
                });

            modelBuilder.Entity("Lanekassen.Models.SubjectField", b =>
                {
                    b.Property<int>("SubjectFieldId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("SubjectFieldId"));

                    b.Property<int>("DepartmentId")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("SubjectFieldId");

                    b.HasIndex("DepartmentId");

                    b.ToTable("SubjectFields");

                    b.HasData(
                        new
                        {
                            SubjectFieldId = 1,
                            DepartmentId = 1,
                            Name = "Virksomhetsarkitektur og Prosjektledelse"
                        },
                        new
                        {
                            SubjectFieldId = 2,
                            DepartmentId = 1,
                            Name = "Applikasjonsdrift"
                        },
                        new
                        {
                            SubjectFieldId = 3,
                            DepartmentId = 1,
                            Name = "Systemutvikling og test"
                        },
                        new
                        {
                            SubjectFieldId = 4,
                            DepartmentId = 1,
                            Name = "Informasjonssikkerhet"
                        },
                        new
                        {
                            SubjectFieldId = 5,
                            DepartmentId = 1,
                            Name = "Data og informasjonsforvaltning"
                        },
                        new
                        {
                            SubjectFieldId = 6,
                            DepartmentId = 1,
                            Name = "Leverandørstyring og økonomi"
                        },
                        new
                        {
                            SubjectFieldId = 7,
                            DepartmentId = 1,
                            Name = "Drift og avtaleeierskap"
                        },
                        new
                        {
                            SubjectFieldId = 8,
                            DepartmentId = 1,
                            Name = "IT Brukerstøtte"
                        },
                        new
                        {
                            SubjectFieldId = 9,
                            DepartmentId = 1,
                            Name = "Rekruttering og kompetanse"
                        });
                });

            modelBuilder.Entity("Lanekassen.Models.Team", b =>
                {
                    b.Property<int>("TeamId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("TeamId"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("TeamId");

                    b.ToTable("Teams");

                    b.HasData(
                        new
                        {
                            TeamId = 1,
                            Name = "Rubik"
                        },
                        new
                        {
                            TeamId = 2,
                            Name = "Settlers"
                        },
                        new
                        {
                            TeamId = 3,
                            Name = "Dominion"
                        },
                        new
                        {
                            TeamId = 4,
                            Name = "Portal"
                        },
                        new
                        {
                            TeamId = 5,
                            Name = "Pong"
                        },
                        new
                        {
                            TeamId = 6,
                            Name = "Test"
                        },
                        new
                        {
                            TeamId = 7,
                            Name = "Ledergruppe IT"
                        },
                        new
                        {
                            TeamId = 8,
                            Name = "Utvidet Ledergruppe IT"
                        });
                });

            modelBuilder.Entity("Lanekassen.Models.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("UserId"));

                    b.Property<bool>("Admin")
                        .HasColumnType("boolean");

                    b.Property<string>("AzureId")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnOrder(0);

                    b.Property<string>("BusinessAffiliation")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int?>("DepartmentId")
                        .HasColumnType("integer");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("EmploymentType")
                        .HasColumnType("integer");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnOrder(1);

                    b.Property<int?>("SectionId")
                        .HasColumnType("integer");

                    b.HasKey("UserId");

                    b.HasIndex("DepartmentId");

                    b.HasIndex("SectionId");

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            UserId = 1,
                            Admin = false,
                            AzureId = "Falsk-azure-id",
                            BusinessAffiliation = "Lånekassen",
                            DepartmentId = 1,
                            Email = "ola@nordmann.no",
                            EmploymentType = 0,
                            FirstName = "Ola",
                            LastName = "Nordmann",
                            SectionId = 1
                        });
                });

            modelBuilder.Entity("RoleUser", b =>
                {
                    b.Property<int>("RolesRoleId")
                        .HasColumnType("integer");

                    b.Property<int>("UsersUserId")
                        .HasColumnType("integer");

                    b.HasKey("RolesRoleId", "UsersUserId");

                    b.HasIndex("UsersUserId");

                    b.ToTable("RoleUser");

                    b.HasData(
                        new
                        {
                            RolesRoleId = 1,
                            UsersUserId = 1
                        });
                });

            modelBuilder.Entity("SubjectFieldUser", b =>
                {
                    b.Property<int>("SubjectFieldsSubjectFieldId")
                        .HasColumnType("integer");

                    b.Property<int>("UsersUserId")
                        .HasColumnType("integer");

                    b.HasKey("SubjectFieldsSubjectFieldId", "UsersUserId");

                    b.HasIndex("UsersUserId");

                    b.ToTable("SubjectFieldUser");

                    b.HasData(
                        new
                        {
                            SubjectFieldsSubjectFieldId = 1,
                            UsersUserId = 1
                        });
                });

            modelBuilder.Entity("TeamUser", b =>
                {
                    b.Property<int>("TeamsTeamId")
                        .HasColumnType("integer");

                    b.Property<int>("UsersUserId")
                        .HasColumnType("integer");

                    b.HasKey("TeamsTeamId", "UsersUserId");

                    b.HasIndex("UsersUserId");

                    b.ToTable("TeamUser");

                    b.HasData(
                        new
                        {
                            TeamsTeamId = 1,
                            UsersUserId = 1
                        });
                });

            modelBuilder.Entity("DepartmentRole", b =>
                {
                    b.HasOne("Lanekassen.Models.Department", null)
                        .WithMany()
                        .HasForeignKey("DepartmentsDepartmentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Lanekassen.Models.Role", null)
                        .WithMany()
                        .HasForeignKey("RolesRoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("DepartmentSection", b =>
                {
                    b.HasOne("Lanekassen.Models.Department", null)
                        .WithMany()
                        .HasForeignKey("DepartmentsDepartmentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Lanekassen.Models.Section", null)
                        .WithMany()
                        .HasForeignKey("SectionsSectionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("DepartmentTeam", b =>
                {
                    b.HasOne("Lanekassen.Models.Department", null)
                        .WithMany()
                        .HasForeignKey("DepartmentsDepartmentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Lanekassen.Models.Team", null)
                        .WithMany()
                        .HasForeignKey("TeamsTeamId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Lanekassen.Models.Absence", b =>
                {
                    b.HasOne("Lanekassen.Models.AbsenceType", "Type")
                        .WithMany("Absences")
                        .HasForeignKey("AbsenceTypeId");

                    b.HasOne("Lanekassen.Models.User", "User")
                        .WithMany("Absences")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Type");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Lanekassen.Models.SubjectField", b =>
                {
                    b.HasOne("Lanekassen.Models.Department", "Department")
                        .WithMany("SubjectFields")
                        .HasForeignKey("DepartmentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Department");
                });

            modelBuilder.Entity("Lanekassen.Models.User", b =>
                {
                    b.HasOne("Lanekassen.Models.Department", "Department")
                        .WithMany("Users")
                        .HasForeignKey("DepartmentId");

                    b.HasOne("Lanekassen.Models.Section", "Section")
                        .WithMany("Users")
                        .HasForeignKey("SectionId");

                    b.Navigation("Department");

                    b.Navigation("Section");
                });

            modelBuilder.Entity("RoleUser", b =>
                {
                    b.HasOne("Lanekassen.Models.Role", null)
                        .WithMany()
                        .HasForeignKey("RolesRoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Lanekassen.Models.User", null)
                        .WithMany()
                        .HasForeignKey("UsersUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("SubjectFieldUser", b =>
                {
                    b.HasOne("Lanekassen.Models.SubjectField", null)
                        .WithMany()
                        .HasForeignKey("SubjectFieldsSubjectFieldId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Lanekassen.Models.User", null)
                        .WithMany()
                        .HasForeignKey("UsersUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("TeamUser", b =>
                {
                    b.HasOne("Lanekassen.Models.Team", null)
                        .WithMany()
                        .HasForeignKey("TeamsTeamId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Lanekassen.Models.User", null)
                        .WithMany()
                        .HasForeignKey("UsersUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Lanekassen.Models.AbsenceType", b =>
                {
                    b.Navigation("Absences");
                });

            modelBuilder.Entity("Lanekassen.Models.Department", b =>
                {
                    b.Navigation("SubjectFields");

                    b.Navigation("Users");
                });

            modelBuilder.Entity("Lanekassen.Models.Section", b =>
                {
                    b.Navigation("Users");
                });

            modelBuilder.Entity("Lanekassen.Models.User", b =>
                {
                    b.Navigation("Absences");
                });
#pragma warning restore 612, 618
        }
    }
}
