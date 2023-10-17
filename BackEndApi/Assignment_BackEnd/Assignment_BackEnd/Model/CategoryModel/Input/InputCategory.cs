using System.ComponentModel.DataAnnotations;

namespace Assignment_BackEnd.Model.CategoryModel.Input
{
    public class InputCategory
    {
        [Required]
        //Input
        public string name { get; set; }
        //Output Result
        public bool? save { get; set; }
        public string? message { get; set; }
    }
}
