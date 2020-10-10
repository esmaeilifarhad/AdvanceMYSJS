using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace AdvanceMYS.Migrations
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "5069_Esmaeili");

            migrationBuilder.CreateTable(
                name: "Cat",
                schema: "5069_Esmaeili",
                columns: table => new
                {
                    CatId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false),
                    Code = table.Column<int>(type: "int", nullable: false),
                    Dsc = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: true),
                    UserId = table.Column<int>(type: "int", nullable: true),
                    Order = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cat", x => x.CatId);
                });

            migrationBuilder.CreateTable(
                name: "IODayly",
                schema: "5069_Esmaeili",
                columns: table => new
                {
                    IOId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    STime = table.Column<int>(type: "int", nullable: true),
                    ETime = table.Column<int>(type: "int", nullable: true),
                    IOType = table.Column<int>(type: "int", nullable: true),
                    DayDate = table.Column<string>(type: "nvarchar(6)", maxLength: 6, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IODayly", x => x.IOId);
                });

            migrationBuilder.CreateTable(
                name: "LogTBL",
                schema: "5069_Esmaeili",
                columns: table => new
                {
                    LogId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: true),
                    dsc = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: true),
                    date = table.Column<string>(type: "nvarchar(8)", maxLength: 8, nullable: true),
                    Time = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LogTBL", x => x.LogId);
                });

            migrationBuilder.CreateTable(
                name: "ManageTime",
                schema: "5069_Esmaeili",
                columns: table => new
                {
                    ManageTimeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Label = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Value = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ManageTime", x => x.ManageTimeId);
                });

            migrationBuilder.CreateTable(
                name: "MasterDatum",
                schema: "5069_Esmaeili",
                columns: table => new
                {
                    MasterDataId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Weight = table.Column<double>(type: "float", nullable: true),
                    WeightDate = table.Column<string>(type: "nvarchar(6)", maxLength: 6, nullable: true),
                    Personelid = table.Column<int>(type: "int", nullable: true),
                    PersonelName = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Weight", x => x.MasterDataId);
                });

            migrationBuilder.CreateTable(
                name: "Menu",
                schema: "5069_Esmaeili",
                columns: table => new
                {
                    MenuId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MenuName = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false),
                    Order = table.Column<int>(type: "int", nullable: true),
                    IsCascade = table.Column<bool>(type: "bit", nullable: true),
                    Url = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Controller = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Action = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Menu", x => x.MenuId);
                });

            migrationBuilder.CreateTable(
                name: "Menuha",
                schema: "5069_Esmaeili",
                columns: table => new
                {
                    MenuhaId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false),
                    MenuId = table.Column<int>(type: "int", nullable: false),
                    Order = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Menuha", x => x.MenuhaId);
                });

            migrationBuilder.CreateTable(
                name: "MVCHomeHeaderThree",
                schema: "5069_Esmaeili",
                columns: table => new
                {
                    MVCHomeHeaderThreeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Header = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Matn = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Logo = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MVCHomeHeaderThree", x => x.MVCHomeHeaderThreeId);
                });

            migrationBuilder.CreateTable(
                name: "Namad",
                schema: "5069_Esmaeili",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Namad = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false),
                    CodeSherkat = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false),
                    tseAdrs = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    RahavardId = table.Column<int>(type: "int", nullable: true),
                    NamadSahih = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: true),
                    tseId = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Namad", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Player",
                schema: "5069_Esmaeili",
                columns: table => new
                {
                    PlayersId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    IsHozoor = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Player", x => x.PlayersId);
                });

            migrationBuilder.CreateTable(
                name: "Role",
                schema: "5069_Esmaeili",
                columns: table => new
                {
                    RoleId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleName = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Role", x => x.RoleId);
                });

            migrationBuilder.CreateTable(
                name: "Setting",
                schema: "5069_Esmaeili",
                columns: table => new
                {
                    SettingId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Key = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Value = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: true),
                    Description = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: true),
                    UserId = table.Column<int>(type: "int", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Setting", x => x.SettingId);
                });

            migrationBuilder.CreateTable(
                name: "SliderPhoto",
                schema: "5069_Esmaeili",
                columns: table => new
                {
                    SliderPhotoId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PhotoImg = table.Column<byte[]>(type: "image", nullable: false),
                    Header = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: true),
                    Matn = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    URL = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SliderPhoto", x => x.SliderPhotoId);
                });

            migrationBuilder.CreateTable(
                name: "Taghvim",
                schema: "5069_Esmaeili",
                columns: table => new
                {
                    TaghvimId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IsHolyDay = table.Column<bool>(type: "bit", nullable: false),
                    Date = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Dsc = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Taghvim", x => x.TaghvimId);
                });

            migrationBuilder.CreateTable(
                name: "User",
                schema: "5069_Esmaeili",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserName = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false),
                    Password = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: true),
                    Name = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.UserId);
                });

            migrationBuilder.CreateTable(
                name: "Sport",
                schema: "5069_Esmaeili",
                columns: table => new
                {
                    SportId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CatId = table.Column<int>(type: "int", nullable: false),
                    Date = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    Tedad = table.Column<int>(type: "int", nullable: false),
                    Set = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sport", x => x.SportId);
                    table.ForeignKey(
                        name: "FK_Sport_Cat",
                        column: x => x.CatId,
                        principalSchema: "5069_Esmaeili",
                        principalTable: "Cat",
                        principalColumn: "CatId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "NamadDetail",
                schema: "5069_Esmaeili",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NamadId = table.Column<int>(type: "int", nullable: true),
                    ShamsyDate = table.Column<string>(type: "nvarchar(16)", maxLength: 16, nullable: true),
                    Hajm = table.Column<long>(type: "bigint", nullable: true),
                    TedadMoamelat = table.Column<long>(type: "bigint", nullable: true),
                    DarsadGheymatPayany = table.Column<double>(type: "float", nullable: true),
                    GheymatPayany = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NamadDetail", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NamadDetail_Namad",
                        column: x => x.NamadId,
                        principalSchema: "5069_Esmaeili",
                        principalTable: "Namad",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Book",
                schema: "5069_Esmaeili",
                columns: table => new
                {
                    BookId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: true),
                    Order = table.Column<string>(type: "nchar(10)", fixedLength: true, maxLength: 10, nullable: true),
                    dsc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<int>(type: "int", nullable: true),
                    RepeatCount = table.Column<int>(type: "int", nullable: true),
                    date = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: true),
                    time = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: true),
                    RepeatedNumber = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Book", x => x.BookId);
                    table.ForeignKey(
                        name: "FK_Book_Users",
                        column: x => x.UserId,
                        principalSchema: "5069_Esmaeili",
                        principalTable: "User",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Category",
                schema: "5069_Esmaeili",
                columns: table => new
                {
                    CategoryId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CategoryName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Category", x => x.CategoryId);
                    table.ForeignKey(
                        name: "FK_Category_Users",
                        column: x => x.UserId,
                        principalSchema: "5069_Esmaeili",
                        principalTable: "User",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "dic_tbl",
                schema: "5069_Esmaeili",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    eng = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    per = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Phonetic = table.Column<string>(type: "nvarchar(70)", maxLength: 70, nullable: true),
                    level = table.Column<int>(type: "int", nullable: false),
                    date_s = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    date_refresh = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    time = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    timeword = table.Column<int>(type: "int", nullable: true, defaultValueSql: "((0))"),
                    id_month = table.Column<int>(type: "int", nullable: true),
                    SuccessCount = table.Column<int>(type: "int", nullable: true),
                    UnSuccessCount = table.Column<int>(type: "int", nullable: true),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    CreateDateM = table.Column<DateTime>(type: "date", nullable: true),
                    DateRefreshM = table.Column<DateTime>(type: "date", nullable: true),
                    IsArchieve = table.Column<bool>(type: "bit", nullable: true, defaultValueSql: "((0))")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_dic_tbl", x => x.id);
                    table.ForeignKey(
                        name: "FK_dic_tbl_Users",
                        column: x => x.UserId,
                        principalSchema: "5069_Esmaeili",
                        principalTable: "User",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PlayerScore",
                schema: "5069_Esmaeili",
                columns: table => new
                {
                    PlayerScoreId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    PlayerId = table.Column<int>(type: "int", nullable: false),
                    Score = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlayerScore", x => x.PlayerScoreId);
                    table.ForeignKey(
                        name: "FK_PlayerScore_Players",
                        column: x => x.PlayerId,
                        principalSchema: "5069_Esmaeili",
                        principalTable: "Player",
                        principalColumn: "PlayersId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PlayerScore_Users",
                        column: x => x.UserId,
                        principalSchema: "5069_Esmaeili",
                        principalTable: "User",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RoutineJob",
                schema: "5069_Esmaeili",
                columns: table => new
                {
                    RoutineJobId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoozDaily = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: true),
                    Job = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: true),
                    Rate = table.Column<int>(type: "int", nullable: true),
                    Order = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoutineJob", x => x.RoutineJobId);
                    table.ForeignKey(
                        name: "FK_RoutineJob_Users",
                        column: x => x.UserId,
                        principalSchema: "5069_Esmaeili",
                        principalTable: "User",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Task",
                schema: "5069_Esmaeili",
                columns: table => new
                {
                    TaskId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateStart = table.Column<string>(type: "nvarchar(8)", maxLength: 8, nullable: false),
                    DateEnd = table.Column<string>(type: "nvarchar(8)", maxLength: 8, nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    IsCheck = table.Column<bool>(type: "bit", nullable: true),
                    DarsadPishraft = table.Column<int>(type: "int", nullable: true),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    Olaviat = table.Column<int>(type: "int", nullable: true),
                    CatId = table.Column<int>(type: "int", nullable: true),
                    Rate = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Task", x => x.TaskId);
                    table.ForeignKey(
                        name: "FK_Task_Cat",
                        column: x => x.CatId,
                        principalSchema: "5069_Esmaeili",
                        principalTable: "Cat",
                        principalColumn: "CatId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Task_Users",
                        column: x => x.UserId,
                        principalSchema: "5069_Esmaeili",
                        principalTable: "User",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserRole",
                schema: "5069_Esmaeili",
                columns: table => new
                {
                    UserRoleId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRole", x => x.UserRoleId);
                    table.ForeignKey(
                        name: "FK_UserRole_Role",
                        column: x => x.RoleId,
                        principalSchema: "5069_Esmaeili",
                        principalTable: "Role",
                        principalColumn: "RoleId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserRole_Users",
                        column: x => x.UserId,
                        principalSchema: "5069_Esmaeili",
                        principalTable: "User",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TitleTbl",
                schema: "5069_Esmaeili",
                columns: table => new
                {
                    TitleId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BookId = table.Column<int>(type: "int", nullable: true),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    order = table.Column<string>(type: "nchar(10)", fixedLength: true, maxLength: 10, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TitleTbl", x => x.TitleId);
                    table.ForeignKey(
                        name: "FK_TitleTbl_Book",
                        column: x => x.BookId,
                        principalSchema: "5069_Esmaeili",
                        principalTable: "Book",
                        principalColumn: "BookId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Job",
                schema: "5069_Esmaeili",
                columns: table => new
                {
                    JobId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    CategoryId = table.Column<int>(type: "int", nullable: true),
                    GridShow = table.Column<bool>(type: "bit", nullable: true),
                    Mohasebe = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Job", x => x.JobId);
                    table.ForeignKey(
                        name: "FK_Job_Category",
                        column: x => x.CategoryId,
                        principalSchema: "5069_Esmaeili",
                        principalTable: "Category",
                        principalColumn: "CategoryId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DaysExercise",
                schema: "5069_Esmaeili",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DateExercise = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    WordId = table.Column<int>(type: "int", nullable: true),
                    Succ_OR_UnSucc = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DaysExercise", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DaysExercise_dic_tbl",
                        column: x => x.WordId,
                        principalSchema: "5069_Esmaeili",
                        principalTable: "dic_tbl",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "example_tbl",
                schema: "5069_Esmaeili",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    id_dic_tbl = table.Column<int>(type: "int", nullable: false),
                    example = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_example_tbl", x => x.id);
                    table.ForeignKey(
                        name: "FK_example_tbl_dic_tbl",
                        column: x => x.id_dic_tbl,
                        principalSchema: "5069_Esmaeili",
                        principalTable: "dic_tbl",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RoutineJobHa",
                schema: "5069_Esmaeili",
                columns: table => new
                {
                    RoutineJobHa = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Date = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    RoutineJobId = table.Column<int>(type: "int", nullable: false),
                    IsCheck = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoutineJobHa", x => x.RoutineJobHa);
                    table.ForeignKey(
                        name: "FK_RoutineJobHa_RoutineJob",
                        column: x => x.RoutineJobId,
                        principalSchema: "5069_Esmaeili",
                        principalTable: "RoutineJob",
                        principalColumn: "RoutineJobId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TaskImage",
                schema: "5069_Esmaeili",
                columns: table => new
                {
                    TaskImageId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    img = table.Column<byte[]>(type: "image", nullable: true),
                    TaskId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaskImage", x => x.TaskImageId);
                    table.ForeignKey(
                        name: "FK_TaskImage_Task",
                        column: x => x.TaskId,
                        principalSchema: "5069_Esmaeili",
                        principalTable: "Task",
                        principalColumn: "TaskId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Timing",
                schema: "5069_Esmaeili",
                columns: table => new
                {
                    TimingId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TaskId = table.Column<int>(type: "int", nullable: false),
                    ManageTimeId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Timing", x => x.TimingId);
                    table.ForeignKey(
                        name: "FK_Timing_ManageTime",
                        column: x => x.ManageTimeId,
                        principalSchema: "5069_Esmaeili",
                        principalTable: "ManageTime",
                        principalColumn: "ManageTimeId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Timing_Task",
                        column: x => x.TaskId,
                        principalSchema: "5069_Esmaeili",
                        principalTable: "Task",
                        principalColumn: "TaskId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ContentTbl",
                schema: "5069_Esmaeili",
                columns: table => new
                {
                    ContentId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TitleId = table.Column<int>(type: "int", nullable: true),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    order = table.Column<string>(type: "nchar(10)", fixedLength: true, maxLength: 10, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContentTbl", x => x.ContentId);
                    table.ForeignKey(
                        name: "FK_ContentTbl_TitleTbl",
                        column: x => x.TitleId,
                        principalSchema: "5069_Esmaeili",
                        principalTable: "TitleTbl",
                        principalColumn: "TitleId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "KarKard",
                schema: "5069_Esmaeili",
                columns: table => new
                {
                    KarkardId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    JobId = table.Column<int>(type: "int", nullable: true),
                    DayDate = table.Column<string>(type: "nvarchar(8)", maxLength: 8, nullable: false),
                    SpendTimeMinute = table.Column<int>(type: "int", nullable: false),
                    StartTime = table.Column<TimeSpan>(type: "time", nullable: true),
                    EndTime = table.Column<TimeSpan>(type: "time", nullable: true),
                    MiladyDate = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KarKard", x => x.KarkardId);
                    table.ForeignKey(
                        name: "FK_KarKard_Job",
                        column: x => x.JobId,
                        principalSchema: "5069_Esmaeili",
                        principalTable: "Job",
                        principalColumn: "JobId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PercentJob",
                schema: "5069_Esmaeili",
                columns: table => new
                {
                    PercentId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    JobId = table.Column<int>(type: "int", nullable: false),
                    PercentValue = table.Column<int>(type: "int", nullable: false),
                    Date = table.Column<string>(type: "varchar(6)", unicode: false, maxLength: 6, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PercentJob", x => x.PercentId);
                    table.ForeignKey(
                        name: "FK_PercentJob_Job",
                        column: x => x.JobId,
                        principalSchema: "5069_Esmaeili",
                        principalTable: "Job",
                        principalColumn: "JobId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Book_UserId",
                schema: "5069_Esmaeili",
                table: "Book",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Category_UserId",
                schema: "5069_Esmaeili",
                table: "Category",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_ContentTbl_TitleId",
                schema: "5069_Esmaeili",
                table: "ContentTbl",
                column: "TitleId");

            migrationBuilder.CreateIndex(
                name: "IX_DaysExercise_WordId",
                schema: "5069_Esmaeili",
                table: "DaysExercise",
                column: "WordId");

            migrationBuilder.CreateIndex(
                name: "IX_dic_tbl",
                schema: "5069_Esmaeili",
                table: "dic_tbl",
                columns: new[] { "eng", "UserId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_dic_tbl_1",
                schema: "5069_Esmaeili",
                table: "dic_tbl",
                column: "level");

            migrationBuilder.CreateIndex(
                name: "IX_dic_tbl_UserId",
                schema: "5069_Esmaeili",
                table: "dic_tbl",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_example_tbl_id_dic_tbl",
                schema: "5069_Esmaeili",
                table: "example_tbl",
                column: "id_dic_tbl");

            migrationBuilder.CreateIndex(
                name: "IX_IODayly",
                schema: "5069_Esmaeili",
                table: "IODayly",
                columns: new[] { "DayDate", "IOType" },
                unique: true,
                filter: "[IOType] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Job_CategoryId",
                schema: "5069_Esmaeili",
                table: "Job",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_KarKard_JobId",
                schema: "5069_Esmaeili",
                table: "KarKard",
                column: "JobId");

            migrationBuilder.CreateIndex(
                name: "IX_NamadDetail_NamadId",
                schema: "5069_Esmaeili",
                table: "NamadDetail",
                column: "NamadId");

            migrationBuilder.CreateIndex(
                name: "IX_PercentJob_JobId",
                schema: "5069_Esmaeili",
                table: "PercentJob",
                column: "JobId");

            migrationBuilder.CreateIndex(
                name: "IX_PlayerScore_PlayerId",
                schema: "5069_Esmaeili",
                table: "PlayerScore",
                column: "PlayerId");

            migrationBuilder.CreateIndex(
                name: "IX_PlayerScore_UserId",
                schema: "5069_Esmaeili",
                table: "PlayerScore",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_RoutineJob_UserId",
                schema: "5069_Esmaeili",
                table: "RoutineJob",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_RoutineJobHa",
                schema: "5069_Esmaeili",
                table: "RoutineJobHa",
                columns: new[] { "Date", "RoutineJobId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_RoutineJobHa_RoutineJobId",
                schema: "5069_Esmaeili",
                table: "RoutineJobHa",
                column: "RoutineJobId");

            migrationBuilder.CreateIndex(
                name: "IX_Sport_CatId",
                schema: "5069_Esmaeili",
                table: "Sport",
                column: "CatId");

            migrationBuilder.CreateIndex(
                name: "IX_Task_CatId",
                schema: "5069_Esmaeili",
                table: "Task",
                column: "CatId");

            migrationBuilder.CreateIndex(
                name: "IX_Task_UserId",
                schema: "5069_Esmaeili",
                table: "Task",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_TaskImage_TaskId",
                schema: "5069_Esmaeili",
                table: "TaskImage",
                column: "TaskId");

            migrationBuilder.CreateIndex(
                name: "IX_Timing_ManageTimeId",
                schema: "5069_Esmaeili",
                table: "Timing",
                column: "ManageTimeId");

            migrationBuilder.CreateIndex(
                name: "IX_Timing_TaskId",
                schema: "5069_Esmaeili",
                table: "Timing",
                column: "TaskId");

            migrationBuilder.CreateIndex(
                name: "IX_TitleTbl_BookId",
                schema: "5069_Esmaeili",
                table: "TitleTbl",
                column: "BookId");

            migrationBuilder.CreateIndex(
                name: "IX_Users",
                schema: "5069_Esmaeili",
                table: "User",
                column: "UserName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_1",
                schema: "5069_Esmaeili",
                table: "User",
                column: "PhoneNumber",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserRole_RoleId",
                schema: "5069_Esmaeili",
                table: "UserRole",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_UserRole_UserId",
                schema: "5069_Esmaeili",
                table: "UserRole",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ContentTbl",
                schema: "5069_Esmaeili");

            migrationBuilder.DropTable(
                name: "DaysExercise",
                schema: "5069_Esmaeili");

            migrationBuilder.DropTable(
                name: "example_tbl",
                schema: "5069_Esmaeili");

            migrationBuilder.DropTable(
                name: "IODayly",
                schema: "5069_Esmaeili");

            migrationBuilder.DropTable(
                name: "KarKard",
                schema: "5069_Esmaeili");

            migrationBuilder.DropTable(
                name: "LogTBL",
                schema: "5069_Esmaeili");

            migrationBuilder.DropTable(
                name: "MasterDatum",
                schema: "5069_Esmaeili");

            migrationBuilder.DropTable(
                name: "Menu",
                schema: "5069_Esmaeili");

            migrationBuilder.DropTable(
                name: "Menuha",
                schema: "5069_Esmaeili");

            migrationBuilder.DropTable(
                name: "MVCHomeHeaderThree",
                schema: "5069_Esmaeili");

            migrationBuilder.DropTable(
                name: "NamadDetail",
                schema: "5069_Esmaeili");

            migrationBuilder.DropTable(
                name: "PercentJob",
                schema: "5069_Esmaeili");

            migrationBuilder.DropTable(
                name: "PlayerScore",
                schema: "5069_Esmaeili");

            migrationBuilder.DropTable(
                name: "RoutineJobHa",
                schema: "5069_Esmaeili");

            migrationBuilder.DropTable(
                name: "Setting",
                schema: "5069_Esmaeili");

            migrationBuilder.DropTable(
                name: "SliderPhoto",
                schema: "5069_Esmaeili");

            migrationBuilder.DropTable(
                name: "Sport",
                schema: "5069_Esmaeili");

            migrationBuilder.DropTable(
                name: "Taghvim",
                schema: "5069_Esmaeili");

            migrationBuilder.DropTable(
                name: "TaskImage",
                schema: "5069_Esmaeili");

            migrationBuilder.DropTable(
                name: "Timing",
                schema: "5069_Esmaeili");

            migrationBuilder.DropTable(
                name: "UserRole",
                schema: "5069_Esmaeili");

            migrationBuilder.DropTable(
                name: "TitleTbl",
                schema: "5069_Esmaeili");

            migrationBuilder.DropTable(
                name: "dic_tbl",
                schema: "5069_Esmaeili");

            migrationBuilder.DropTable(
                name: "Namad",
                schema: "5069_Esmaeili");

            migrationBuilder.DropTable(
                name: "Job",
                schema: "5069_Esmaeili");

            migrationBuilder.DropTable(
                name: "Player",
                schema: "5069_Esmaeili");

            migrationBuilder.DropTable(
                name: "RoutineJob",
                schema: "5069_Esmaeili");

            migrationBuilder.DropTable(
                name: "ManageTime",
                schema: "5069_Esmaeili");

            migrationBuilder.DropTable(
                name: "Task",
                schema: "5069_Esmaeili");

            migrationBuilder.DropTable(
                name: "Role",
                schema: "5069_Esmaeili");

            migrationBuilder.DropTable(
                name: "Book",
                schema: "5069_Esmaeili");

            migrationBuilder.DropTable(
                name: "Category",
                schema: "5069_Esmaeili");

            migrationBuilder.DropTable(
                name: "Cat",
                schema: "5069_Esmaeili");

            migrationBuilder.DropTable(
                name: "User",
                schema: "5069_Esmaeili");
        }
    }
}
