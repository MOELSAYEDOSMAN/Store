using Assignment_BackEnd.BLL.Account;
using Assignment_BackEnd.Model.UserModel;
using Assignment_BackEnd.Model.UserModel.Input;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Assignment_BackEnd.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {

        public readonly IAccountUserSetting userSetting;
        public AccountController(IAccountUserSetting _userSetting)
        {
            userSetting= _userSetting;
        }
        [HttpPost("Login")]
        public async Task<IActionResult> Login(InputLogin input)
        {
            if (!ModelState.IsValid)
                return BadRequest(new AccountOutput()
                {
                    message = "Cheack Input Data",
                    isLogin = false,
                    error = true
                });
            else
                return Ok(await userSetting.Login(input));
        }


        [HttpPost("Register")]
        public async Task<IActionResult> Register(InputRegister input)
        {
            Console.WriteLine("Register");
            if (!ModelState.IsValid)
                return BadRequest(new AccountOutput()
                {
                    message = "Cheack Input Data",
                    isLogin = false,
                    error = true
                });
            else
                return Ok(await userSetting.Register(input));
        }

        [HttpGet("LogOut"),Authorize]
        public async Task<IActionResult>Logout()
        {
            Console.WriteLine("Logout");
            await userSetting.LogOut();
            return Ok(true);
        }
    }
}
