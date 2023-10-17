using Assignment_BackEnd.BLL.CategoryLayer;
using Assignment_BackEnd.BLL.EditImageLocation;
using Assignment_BackEnd.Model;
using Assignment_BackEnd.Model.ProductModel;
using Assignment_BackEnd.Model.ProductModel.Input;
using Assignment_BackEnd.Model.ProductModel.OutputProducts;
using Microsoft.EntityFrameworkCore;

namespace Assignment_BackEnd.BLL.ProductLayer
{
    public class ProductSetting : IProductSetting
    {
        private readonly DataBaseContext db;
        private ISaveImage svImg { get; set; }
        private ICategorySetting settingCategory { get; set; }
        public ProductSetting(DataBaseContext _db,ISaveImage _svImg, ICategorySetting _settingCategory)
        {
            db = _db;
            svImg = _svImg;
            settingCategory = _settingCategory;
        }

        public async Task<OutputProduct> GetAllProduct(int index)
        {
            var Countproducts = await db.Products.AsNoTracking().CountAsync();
            return new()
            {
                CountPage = (Countproducts / 8) + 1,
                Products = await db.Products.AsNoTracking().Skip(8 * index).Take(8).Include(c => c.Category).ToListAsync()
            };
        }

        public async Task<OutputProduct> GetNewProduct(int index)
        {
            var Countproducts = await db.Products.AsNoTracking().CountAsync();
            return new()
            {
                CountPage = (Countproducts / 8) + 1,
                Products = await db.Products.AsNoTracking().OrderByDescending(p=>p.Created).Skip(8 * index).Take(8).Include(c => c.Category).ToListAsync()
            };
        }

        public async Task<Product> GetProduct(string Id)
        {
            return await db.Products.AsNoTracking().Include(c => c.Category).Include(i => i.ProductImages).FirstOrDefaultAsync(p => p.ProductId.ToString() == Id);
        }

        public async Task<OutputProduct> GetWithType(string type, int index)
        {
            var Products=await db.Products.AsNoTracking().Include(c => c.Category).Where(p => p.Category.Name == type).ToArrayAsync();
            return new()
            {
                CountPage = (Products.Count() / 8) + 1,
                Products = Products.Skip(8 * index).Take(8).ToList()
            };
        }

        public async Task<List<Product>> SerchProduct(string name)
        {
            return await db.Products.AsNoTracking()
                .Where(x=>x.Name.ToLower().Contains(name.ToLower()))
                .Take(5).
                Include(c => c.Category).ToListAsync();
        }

        public async Task<inputProduct> RemoveImg(string src)
        {
            Console.WriteLine(src);
           var img= db.ProductImages.SingleOrDefault(x => x.Src == src);
            if (img is not null)
            {
                db.Remove(img);
                await db.SaveChangesAsync();
                bool result = await svImg.DeleteImage($"Product/{src}");
                return new()
                {
                    message = result ? "Done" : "Cannot Delte Try Agine",
                    error = !result,
                    save = result
                };
            }
            else
            {
                return new()
                {
                    message = "Cannot Delte Try Agine",
                    error = true,
                    save = false
                };
            }
        }

        public async Task<inputProduct> RemoveProduct(string Id)
        {
            var p = await GetProduct(Id);
            if(p is not null)
            {
                await svImg.DeleteImage($"Product/{p.Icon}");
                p.ProductImages.ToList().ForEach (async i => {
                    await svImg.DeleteImage($"Product/{i.Src}");
                });
                db.RemoveRange(p.ProductImages);
                db.Remove(p);
                await db.SaveChangesAsync();
                return new()
                {
                    error = false,
                    save = true,
                    message = "Done"
                };
            }

            return new()
            {
                error = true,
                save = false,
                message = "Cheack Product Agine"
            };
        }
        public async Task<inputProduct> AddProduct(IFormFile Icon, List<IFormFile> Imges, inputProduct input)
        {
            var p =await SerchProduct(input.Name);
            if(p.Count!=0)
            {
                return new()
                {
                    error = true,
                    save = false,
                    message = "Cheake Name Product Is Already in Stock"
                };
            }
            else
            {
               if(await settingCategory.GetCategory(input.CategoryId) is  null)
                {
                    return new()
                    {
                        message = "Cheack Category",
                        error = true,
                        save = false
                    };
                }
                Product Newprpoduct = input;
                Newprpoduct.Icon = await svImg.UploadImage("Product", Icon);
                List<string> ImgesLs = await svImg.UploadImagesList("Product", Imges);
                List<ProductImage> lsImgesProduct = new List<ProductImage>();
                ImgesLs.ForEach(i =>
                {
                    lsImgesProduct.Add(new() { 
                    ProductId=Newprpoduct.ProductId,
                    Src=i
                    });
                });
                await db.AddAsync(Newprpoduct);
                await db.AddRangeAsync(lsImgesProduct);
                await db.SaveChangesAsync();
                return new()
                {
                    message = "Done",
                    error = false,
                    save = true
                };

            }
            throw new NotImplementedException();
        }

        public async Task<inputProduct> ChangeImg(IFormFile img, string src)
        {
            bool result = await svImg.ChangeImg($"Product/{src}", img);
            return new()
            {
                message = result ? "Done" : "Error",
                error = !result,
                save = result
            };
        }

        public async Task<inputProduct> EditProduct(inputProduct input,string id)
        {
            var p = await GetProduct(id);
            if (p is null)
                return new()
                {
                    message="Cheack Product Id",
                    error=true,
                    save=false
                };
            else
            {
                p.Name = input.Name;
                p.Description = input.Description;
                p.Price = input.Price;
                p.Discount_Rate = input.Discount_Rate;
                p.MinimumQuantity = input.MinimumQuantity;
                if(await settingCategory.GetCategory(input.CategoryId) is null)
                {
                    return new()
                    {
                        message = "Cheack Category",
                        error = true,
                        save = false
                    };
                }
                p.CategoryId=input.CategoryId;
                db.Update(p);
               await db.SaveChangesAsync();
                return new()
                {
                    message = "Done",
                    error = false,
                    save = true
                };
            }
        }
        public async Task<inputProduct>AddImage(IFormFile Imges,string Id)
        {
            var p =await GetProduct(Id);
            if (p is null)
                return new()
                {
                    error = true,
                    message = "Not Found Product",
                    save = false
                };

            ProductImage imges = new()
            {
                Src = await svImg.UploadImage("Product", Imges)
                ,
                ProductId = p.ProductId
            };
            
            p.ProductImages.Add(imges);
             await db.AddAsync(imges);
             db.SaveChanges();
            return new()
            {
                error = false,
                message = "Save",
                save = true
            };
        }
    }
}
