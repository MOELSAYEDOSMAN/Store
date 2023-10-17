using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Assignment_BackEnd.Migrations
{
    public partial class UserRole : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData
                (
                table: "AspNetRoles",
                columns: new[] { "Id", "Name", "NormalizedName", "ConcurrencyStamp" },
                values: new[] { Guid.NewGuid().ToString(), "User", "User".ToUpper(), Guid.NewGuid().ToString() }
                );
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("Remove * From AspNetRoles");

        }
    }
}
