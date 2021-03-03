using Microsoft.EntityFrameworkCore.Migrations;

namespace AdvanceMYS.Migrations
{
    public partial class examples : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_example_tbl_dic_tbl",
                schema: "5069_Esmaeili",
                table: "example_tbl");

            migrationBuilder.DropIndex(
                name: "IX_example_tbl_id_dic_tbl",
                schema: "5069_Esmaeili",
                table: "example_tbl");

            migrationBuilder.CreateTable(
                name: "DicExamples",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ExampleTbl = table.Column<int>(type: "int", nullable: false),
                    DicTblId = table.Column<int>(type: "int", nullable: false),
                    exampleTblId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DicExamples", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DicExamples_dic_tbl_DicTblId",
                        column: x => x.DicTblId,
                        principalSchema: "5069_Esmaeili",
                        principalTable: "dic_tbl",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DicExamples_example_tbl_exampleTblId",
                        column: x => x.exampleTblId,
                        principalSchema: "5069_Esmaeili",
                        principalTable: "example_tbl",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DicExamples_DicTblId",
                table: "DicExamples",
                column: "DicTblId");

            migrationBuilder.CreateIndex(
                name: "IX_DicExamples_exampleTblId",
                table: "DicExamples",
                column: "exampleTblId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DicExamples");

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
    }
}
