namespace Assignment_BackEnd.Model.ProductModel
{
    public class ProductImage
    {
        public Guid ProductId { get; set; }
        public string Src { get; set; }
        public Product product { get; set; }
    }
}
