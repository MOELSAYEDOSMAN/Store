using Assignment_BackEnd.Model.CategoryModel;
using Assignment_BackEnd.Model.ProductModel;
using Assignment_BackEnd.Model.UserModel;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Assignment_BackEnd.Model
{
    public class DataBaseContext: IdentityDbContext<ApplicationUser>
    {

        public DbSet<Product> Products { get; set; }
        public DbSet<ProductImage> ProductImages { get; set; }
        public DbSet<Category> Categorys { get; set; }


        public DataBaseContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<ProductImage>(i =>
            {
                i.HasKey(l => new { l.ProductId, l.Src });
            });
            base.OnModelCreating(builder);
        }
    }
}
