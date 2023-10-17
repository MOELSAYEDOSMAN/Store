using System.ComponentModel.DataAnnotations;

namespace Assignment_BackEnd.Model.UserModel.Input
{
    public class InputLogin
    {
        [Required, DataType(DataType.EmailAddress)]
        public string Email { get; set; }
        [Required, MinLength(8), DataType(DataType.Password), RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$")]
        public string Password { get; set; }
    }
}
