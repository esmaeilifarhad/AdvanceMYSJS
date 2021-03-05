using Microsoft.EntityFrameworkCore.Migrations;

namespace AdvanceMYS.Migrations
{
    public partial class dsdllkl : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "testt",
                schema: "5069_Esmaeili",
                table: "example_tbl",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "testt",
                schema: "5069_Esmaeili",
                table: "example_tbl");
        }
    }
}
