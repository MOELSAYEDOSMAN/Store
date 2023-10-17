using Assignment_BackEnd.Model;
using Assignment_BackEnd.Model.CategoryModel;
using Assignment_BackEnd.Model.CategoryModel.Input;
using Microsoft.EntityFrameworkCore;

namespace Assignment_BackEnd.BLL.CategoryLayer
{
    public class CategorySetting : ICategorySetting
    {
        private readonly DataBaseContext db;
        public CategorySetting(DataBaseContext _db)
        {
            db = _db;
        }
        public async Task<List<Category>> GetAllCategorys()
        {
            return await db.Categorys.AsNoTracking().Where(c=>c.SoftDelte==false).ToListAsync();
        }
        public async Task<Category> GetCategory(int index)
        {
            return await db.Categorys.AsNoTracking().SingleOrDefaultAsync(c=>c.CategoryId==index);
        }
        public async Task<InputCategory> EditCategory(InputCategory input, int index)
        {
            var catogry = await GetCategory(index);
            var serch = await SerchWithName(input.name);
            if (catogry is not null&& serch is null)
            {
                catogry.Name = input.name;
                db.Update(catogry);
                await db.SaveChangesAsync();
                return new()
                {
                    message = "Done",
                    save = true
                };
            }
            else if(serch is not null)
                return new()
                {
                    message = "There is Category Have Same Name",
                    save = false
                };
            else
                return new()
                {
                    message = "There is No Category with this Index",
                    save = false
                };

        }
        public async Task<InputCategory> PopCategory(int index)
        {
            var category=await GetCategory(index);
            if(category is not null)
            {
                category.SoftDelte = true;
                db.Update(category);
                await db.SaveChangesAsync();
                return new()
                {
                    message = "Delte",
                    save = true
                };
            }
            else
                return new()
                {
                    message = "There is No Category with this Index",
                    save = true
                };
        }
        public async Task<InputCategory> PushCategory(InputCategory input)
        {
            var category = await SerchWithName(input.name);
            if (category is not null)
                return new()
                {
                    save = false,
                    message = "Change Name"
                };
            else
            {
                var newCategory = new Category()
                {
                    Name = input.name,
                    SoftDelte = false
                };
               await db.AddAsync(newCategory);
               await db.SaveChangesAsync();
                return new()
                {
                    message = "Done",
                    save = true
                };
            }
        }
        private async Task<Category> SerchWithName(string input)
        {
            return await db.Categorys.AsNoTracking()
                .SingleOrDefaultAsync(x => x.Name.ToLower().Contains(input.ToLower()));
        }

    }
}
