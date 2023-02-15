﻿// <auto-generated />
using System;
using Lanekassen.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Lanekassen.Migrations
{
    [DbContext(typeof(ApiDbContext))]
    [Migration("20230215113044_InititalCreate")]
    partial class InititalCreate
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("DepartmentSection", b =>
                {
                    b.Property<int>("DepartmentsDepartmentId")
                        .HasColumnType("integer");

                    b.Property<int>("SectionsSectionId")
                        .HasColumnType("integer");

                    b.HasKey("DepartmentsDepartmentId", "SectionsSectionId");

                    b.HasIndex("SectionsSectionId");

                    b.ToTable("DepartmentSection");
                });

            modelBuilder.Entity("Lanekassen.Models.Absence", b =>
                {
                    b.Property<int>("AbsenceId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("AbsenceId"));

                    b.Property<string>("Comment")
                        .HasColumnType("text");

                    b.Property<DateTime>("EndDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("TypeAbsenceTypeId")
                        .HasColumnType("integer");

                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("AbsenceId");

                    b.HasIndex("TypeAbsenceTypeId");

                    b.HasIndex("UserId");

                    b.ToTable("Absence");
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

                    b.ToTable("AbsenceType");

                    b.HasData(
                        new
                        {
                            AbsenceTypeId = 746969,
                            Code = "T",
                            ColorCode = "",
                            Name = "Tilgjengelig fravær"
                        },
                        new
                        {
                            AbsenceTypeId = 746970,
                            Code = "F",
                            ColorCode = "",
                            Name = "Utilgjengelig fravær"
                        },
                        new
                        {
                            AbsenceTypeId = 746971,
                            Code = "P/S",
                            ColorCode = "",
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

                    b.ToTable("Department");

                    b.HasData(
                        new
                        {
                            DepartmentId = 696969,
                            Abbreviation = "IT",
                            Name = "IT-avdelingen"
                        },
                        new
                        {
                            DepartmentId = 696970,
                            Abbreviation = "UA",
                            Name = "Utdanningsstøtte"
                        },
                        new
                        {
                            DepartmentId = 696971,
                            Abbreviation = "SAK",
                            Name = "Saksavdelingen"
                        },
                        new
                        {
                            DepartmentId = 696972,
                            Abbreviation = "SØ",
                            Name = "Styring og Økonomi"
                        },
                        new
                        {
                            DepartmentId = 696973,
                            Abbreviation = "KOM",
                            Name = "Kommunikasjonsstaben"
                        },
                        new
                        {
                            DepartmentId = 696974,
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

                    b.ToTable("Role");

                    b.HasData(
                        new
                        {
                            RoleId = 736969,
                            Name = "Arkitekt"
                        },
                        new
                        {
                            RoleId = 736970,
                            Name = "Prosjektleder"
                        },
                        new
                        {
                            RoleId = 736971,
                            Name = "App.Drift"
                        },
                        new
                        {
                            RoleId = 736972,
                            Name = "Teamlead"
                        },
                        new
                        {
                            RoleId = 736973,
                            Name = "Tester"
                        },
                        new
                        {
                            RoleId = 736974,
                            Name = "Utvikler"
                        },
                        new
                        {
                            RoleId = 736975,
                            Name = "Designer"
                        },
                        new
                        {
                            RoleId = 736976,
                            Name = "Controller"
                        },
                        new
                        {
                            RoleId = 736977,
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

                    b.ToTable("Section");

                    b.HasData(
                        new
                        {
                            SectionId = 706969,
                            Name = "Trondheim"
                        },
                        new
                        {
                            SectionId = 706970,
                            Name = "Oslo"
                        },
                        new
                        {
                            SectionId = 706971,
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

                    b.ToTable("SubjectField");

                    b.HasData(
                        new
                        {
                            SubjectFieldId = 716969,
                            DepartmentId = 696969,
                            Name = "Virksomhetsarkitektur og Prosjektledelse"
                        },
                        new
                        {
                            SubjectFieldId = 716970,
                            DepartmentId = 696969,
                            Name = "Applikasjonsdrift"
                        },
                        new
                        {
                            SubjectFieldId = 716971,
                            DepartmentId = 696969,
                            Name = "Systemutvikling og test"
                        },
                        new
                        {
                            SubjectFieldId = 716972,
                            DepartmentId = 696969,
                            Name = "Informasjonssikkerhet"
                        },
                        new
                        {
                            SubjectFieldId = 716973,
                            DepartmentId = 696969,
                            Name = "Data og informasjonsforvaltning"
                        },
                        new
                        {
                            SubjectFieldId = 716974,
                            DepartmentId = 696969,
                            Name = "Leverandørstyring og økonomi"
                        },
                        new
                        {
                            SubjectFieldId = 716975,
                            DepartmentId = 696969,
                            Name = "Drift og avtaleeierskap"
                        },
                        new
                        {
                            SubjectFieldId = 716976,
                            DepartmentId = 696969,
                            Name = "IT Brukerstøtte"
                        },
                        new
                        {
                            SubjectFieldId = 716977,
                            DepartmentId = 696969,
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

                    b.ToTable("Team");

                    b.HasData(
                        new
                        {
                            TeamId = 726969,
                            Name = "Rubik"
                        },
                        new
                        {
                            TeamId = 726970,
                            Name = "Settlers"
                        },
                        new
                        {
                            TeamId = 726971,
                            Name = "Dominion"
                        },
                        new
                        {
                            TeamId = 726972,
                            Name = "Portal"
                        },
                        new
                        {
                            TeamId = 726973,
                            Name = "Pong"
                        },
                        new
                        {
                            TeamId = 726974,
                            Name = "Test"
                        },
                        new
                        {
                            TeamId = 726975,
                            Name = "Ledergruppe IT"
                        },
                        new
                        {
                            TeamId = 726976,
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
                        .HasColumnType("text");

                    b.Property<int>("SectionId")
                        .HasColumnType("integer");

                    b.HasKey("UserId");

                    b.HasIndex("SectionId");

                    b.ToTable("User");
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

            modelBuilder.Entity("Lanekassen.Models.Absence", b =>
                {
                    b.HasOne("Lanekassen.Models.AbsenceType", "Type")
                        .WithMany("Absences")
                        .HasForeignKey("TypeAbsenceTypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

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
                    b.HasOne("Lanekassen.Models.Section", "Section")
                        .WithMany("Users")
                        .HasForeignKey("SectionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

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
