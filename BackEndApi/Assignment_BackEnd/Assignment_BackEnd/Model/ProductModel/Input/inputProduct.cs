using System.ComponentModel.DataAnnotations;

namespace Assignment_BackEnd.Model.ProductModel.Input
{
    public class inputProduct
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public decimal Price { get; set; }
        [Required]
        public int MinimumQuantity { get; set; }
        [Required]
        public decimal Discount_Rate { get; set; }
        [Required]
        public int CategoryId { get; set; }

        public string? message { get; set; }
        public bool? save { get; set; }
        public bool? error { get; set; }



        public static implicit operator Product(inputProduct input) =>
            new()
            {
                Name=input.Name,
                Description=input.Description,
                Price=input.Price,
                Discount_Rate=input.Discount_Rate,
                MinimumQuantity=input.MinimumQuantity,
                CategoryId=input.CategoryId,
                ProductId=Guid.NewGuid(),
                Created=DateTime.Now
            };
    }
}
