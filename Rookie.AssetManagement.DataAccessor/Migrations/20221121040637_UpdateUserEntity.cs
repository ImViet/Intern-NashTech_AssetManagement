using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Rookie.AssetManagement.DataAccessor.Migrations
{
    public partial class UpdateUserEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Users_StaffCode",
                table: "Users");

            migrationBuilder.AlterColumn<string>(
                name: "StaffCode",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true,
                computedColumnSql: "'SD' + format([Id], 'd4')",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "StaffCode",
                table: "Users",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true,
                oldComputedColumnSql: "'SD' + format([Id], 'd4')");

            migrationBuilder.CreateIndex(
                name: "IX_Users_StaffCode",
                table: "Users",
                column: "StaffCode",
                unique: true,
                filter: "[StaffCode] IS NOT NULL");
        }
    }
}
