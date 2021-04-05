using Microsoft.EntityFrameworkCore.Migrations;

namespace AdvanceMYS.Migrations
{
    public partial class RateJob : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "JobId",
                table: "Planing",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<float>(
                name: "Rate",
                schema: "5069_Esmaeili",
                table: "Job",
                type: "real",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Planing_JobId",
                table: "Planing",
                column: "JobId");

            migrationBuilder.AddForeignKey(
                name: "FK_Planing_Job_JobId",
                table: "Planing",
                column: "JobId",
                principalSchema: "5069_Esmaeili",
                principalTable: "Job",
                principalColumn: "JobId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Planing_Job_JobId",
                table: "Planing");

            migrationBuilder.DropIndex(
                name: "IX_Planing_JobId",
                table: "Planing");

            migrationBuilder.DropColumn(
                name: "JobId",
                table: "Planing");

            migrationBuilder.DropColumn(
                name: "Rate",
                schema: "5069_Esmaeili",
                table: "Job");
        }
    }
}
