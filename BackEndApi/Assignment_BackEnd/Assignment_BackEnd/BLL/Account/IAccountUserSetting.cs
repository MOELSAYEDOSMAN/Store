using Assignment_BackEnd.Model.UserModel;
using Assignment_BackEnd.Model.UserModel.Input;
using Microsoft.AspNetCore.Components.Routing;

namespace Assignment_BackEnd.BLL.Account
{
    public interface IAccountUserSetting
    {
        public Task<AccountOutput> Login(InputLogin input);
        public Task<AccountOutput> Register(InputRegister input);
        public Task LogOut();
    }
}
