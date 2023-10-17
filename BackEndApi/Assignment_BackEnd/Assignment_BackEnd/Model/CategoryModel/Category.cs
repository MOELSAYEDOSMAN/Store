using Assignment_BackEnd.Model.ProductModel;

namespace Assignment_BackEnd.Model.CategoryModel
{
    public class Category
    {
        public int CategoryId { get; set; }
        public string Name { get; set; }
        public bool SoftDelte { get; set; }
        public HashSet<Product> Products { get; set; }
    }
}
