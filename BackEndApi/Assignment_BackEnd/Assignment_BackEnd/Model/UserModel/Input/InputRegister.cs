using System.ComponentModel.DataAnnotations;

namespace Assignment_BackEnd.Model.UserModel.Input
{
    public class InputRegister
    {
        [Required]
        public string UserName { get; set; }
        [Required,DataType(DataType.EmailAddress)]
        public string Email { get; set; }
        [Required,MinLength(8) ,DataType(DataType.Password),RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$")]
        public string Password { get; set; }
        [Required,MinLength(11),MaxLength(11) ,RegularExpression("^\\+?01[0125][0-9]{8}$")]
        public string Phone { get; set; }

    }
}
