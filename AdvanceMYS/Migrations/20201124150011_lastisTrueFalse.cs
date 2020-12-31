using Microsoft.EntityFrameworkCore.Migrations;

namespace AdvanceMYS.Migrations
{
    public partial class lastisTrueFalse : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "LastIsTrueFalse",
                schema: "5069_Esmaeili",
                table: "dic_tbl",
                type: "bit",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LastIsTrueFalse",
                schema: "5069_Esmaeili",
                table: "dic_tbl");
        }
    }
}
