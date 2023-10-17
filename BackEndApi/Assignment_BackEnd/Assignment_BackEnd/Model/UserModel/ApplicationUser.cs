using Microsoft.AspNetCore.Identity;

namespace Assignment_BackEnd.Model.UserModel
{
    public class ApplicationUser:IdentityUser
    {
        public DateTime LastLogin { get; set; }
    }
}
