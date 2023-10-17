using Assignment_BackEnd.Model.CategoryModel;

namespace Assignment_BackEnd.Model.ProductModel
{
    public class Product
    {
        public Guid ProductId { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }
        public DateTime Created { get; set; }
        public string Icon { get; set; }

        public decimal Price { get; set; }

        public int MinimumQuantity { get; set; }

        public decimal Discount_Rate { get; set; }

        public int CategoryId { get; set; }
        public Category Category { get; set; }

        public HashSet<ProductImage> ProductImages { get; set; }
       
    }
}
