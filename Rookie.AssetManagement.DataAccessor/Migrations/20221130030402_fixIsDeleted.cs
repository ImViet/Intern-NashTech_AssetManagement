using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Rookie.AssetManagement.DataAccessor.Migrations
{
    public partial class fixIsDeleted : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsDelete",
                table: "States");

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "States",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "States");

            migrationBuilder.AddColumn<string>(
                name: "IsDelete",
                table: "States",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
