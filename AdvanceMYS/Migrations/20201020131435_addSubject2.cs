using Microsoft.EntityFrameworkCore.Migrations;

namespace AdvanceMYS.Migrations
{
    public partial class addSubject2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Title",
                schema: "5069_Esmaeili",
                table: "Note",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Title",
                schema: "5069_Esmaeili",
                table: "Note");
        }
    }
}
