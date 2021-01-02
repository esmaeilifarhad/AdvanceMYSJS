using Microsoft.EntityFrameworkCore.Migrations;

namespace AdvanceMYS.Migrations
{
    public partial class ChnageinRela : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Note_Job_JobId",
                schema: "5069_Esmaeili",
                table: "Note");

            migrationBuilder.DropIndex(
                name: "IX_Note_JobId",
                schema: "5069_Esmaeili",
                table: "Note");

            migrationBuilder.DropColumn(
                name: "JobId",
                schema: "5069_Esmaeili",
                table: "Note");

            migrationBuilder.AddColumn<int>(
                name: "JobId",
                schema: "5069_Esmaeili",
                table: "Subject",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Subject_JobId",
                schema: "5069_Esmaeili",
                table: "Subject",
                column: "JobId");

            migrationBuilder.AddForeignKey(
                name: "FK_Subject_Job_JobId",
                schema: "5069_Esmaeili",
                table: "Subject",
                column: "JobId",
                principalSchema: "5069_Esmaeili",
                principalTable: "Job",
                principalColumn: "JobId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Subject_Job_JobId",
                schema: "5069_Esmaeili",
                table: "Subject");

            migrationBuilder.DropIndex(
                name: "IX_Subject_JobId",
                schema: "5069_Esmaeili",
                table: "Subject");

            migrationBuilder.DropColumn(
                name: "JobId",
                schema: "5069_Esmaeili",
                table: "Subject");

            migrationBuilder.AddColumn<int>(
                name: "JobId",
                schema: "5069_Esmaeili",
                table: "Note",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Note_JobId",
                schema: "5069_Esmaeili",
                table: "Note",
                column: "JobId");

            migrationBuilder.AddForeignKey(
                name: "FK_Note_Job_JobId",
                schema: "5069_Esmaeili",
                table: "Note",
                column: "JobId",
                principalSchema: "5069_Esmaeili",
                principalTable: "Job",
                principalColumn: "JobId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
