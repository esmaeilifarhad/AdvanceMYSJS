using Microsoft.EntityFrameworkCore.Migrations;

namespace AdvanceMYS.Migrations
{
    public partial class Plan : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_example_tbl_dic_tbl_DicTblId",
                schema: "5069_Esmaeili",
                table: "example_tbl");

            migrationBuilder.DropIndex(
                name: "IX_example_tbl_DicTblId",
                schema: "5069_Esmaeili",
                table: "example_tbl");

            migrationBuilder.DropColumn(
                name: "DicTblId",
                schema: "5069_Esmaeili",
                table: "example_tbl");

            migrationBuilder.DropColumn(
                name: "testt",
                schema: "5069_Esmaeili",
                table: "example_tbl");

            migrationBuilder.CreateIndex(
                name: "IX_example_tbl_id_dic_tbl",
                schema: "5069_Esmaeili",
                table: "example_tbl",
                column: "id_dic_tbl");

            migrationBuilder.AddForeignKey(
                name: "FK_example_tbl_dic_tbl",
                schema: "5069_Esmaeili",
                table: "example_tbl",
                column: "id_dic_tbl",
                principalSchema: "5069_Esmaeili",
                principalTable: "dic_tbl",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_example_tbl_dic_tbl",
                schema: "5069_Esmaeili",
                table: "example_tbl");

            migrationBuilder.DropIndex(
                name: "IX_example_tbl_id_dic_tbl",
                schema: "5069_Esmaeili",
                table: "example_tbl");

            migrationBuilder.AddColumn<int>(
                name: "DicTblId",
                schema: "5069_Esmaeili",
                table: "example_tbl",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "testt",
                schema: "5069_Esmaeili",
                table: "example_tbl",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_example_tbl_DicTblId",
                schema: "5069_Esmaeili",
                table: "example_tbl",
                column: "DicTblId");

            migrationBuilder.AddForeignKey(
                name: "FK_example_tbl_dic_tbl_DicTblId",
                schema: "5069_Esmaeili",
                table: "example_tbl",
                column: "DicTblId",
                principalSchema: "5069_Esmaeili",
                principalTable: "dic_tbl",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
