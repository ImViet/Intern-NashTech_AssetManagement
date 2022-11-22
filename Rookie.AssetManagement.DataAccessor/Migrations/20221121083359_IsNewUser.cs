using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Rookie.AssetManagement.DataAccessor.Migrations
{
    public partial class IsNewUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsNewUser",
                table: "Users",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsNewUser",
                table: "Users");
        }
    }
}
