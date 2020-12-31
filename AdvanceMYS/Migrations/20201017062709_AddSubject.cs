using Microsoft.EntityFrameworkCore.Migrations;

namespace AdvanceMYS.Migrations
{
    public partial class AddSubject : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "description",
                schema: "5069_Esmaeili",
                table: "Note",
                newName: "Description");

            migrationBuilder.AlterColumn<string>(
                name: "DateRefresh",
                schema: "5069_Esmaeili",
                table: "Note",
                type: "nvarchar(8)",
                maxLength: 8,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "DateCreated",
                schema: "5069_Esmaeili",
                table: "Note",
                type: "nvarchar(8)",
                maxLength: 8,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SubjectId",
                schema: "5069_Esmaeili",
                table: "Note",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Subject",
                schema: "5069_Esmaeili",
                columns: table => new
                {
                    SubjectId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Subject", x => x.SubjectId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Note_SubjectId",
                schema: "5069_Esmaeili",
                table: "Note",
                column: "SubjectId");

            migrationBuilder.AddForeignKey(
                name: "FK_Note_Subject_SubjectId",
                schema: "5069_Esmaeili",
                table: "Note",
                column: "SubjectId",
                principalSchema: "5069_Esmaeili",
                principalTable: "Subject",
                principalColumn: "SubjectId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Note_Subject_SubjectId",
                schema: "5069_Esmaeili",
                table: "Note");

            migrationBuilder.DropTable(
                name: "Subject",
                schema: "5069_Esmaeili");

            migrationBuilder.DropIndex(
                name: "IX_Note_SubjectId",
                schema: "5069_Esmaeili",
                table: "Note");

            migrationBuilder.DropColumn(
                name: "SubjectId",
                schema: "5069_Esmaeili",
                table: "Note");

            migrationBuilder.RenameColumn(
                name: "Description",
                schema: "5069_Esmaeili",
                table: "Note",
                newName: "description");

            migrationBuilder.AlterColumn<string>(
                name: "DateRefresh",
                schema: "5069_Esmaeili",
                table: "Note",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(8)",
                oldMaxLength: 8);

            migrationBuilder.AlterColumn<string>(
                name: "DateCreated",
                schema: "5069_Esmaeili",
                table: "Note",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(8)",
                oldMaxLength: 8);
        }
    }
}
