using Assignment_BackEnd.Model.UserModel;
using Assignment_BackEnd.Model.UserModel.Input;
using Microsoft.AspNetCore.Identity;
using Assignment_BackEnd._JWT;
using Microsoft.Extensions.Options;
using System.Net.Mail;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Assignment_BackEnd.BLL.Account
{
    public class AccountUserSetting : IAccountUserSetting
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly SignInManager<ApplicationUser> signInManager;
        private readonly JWT _jwt;
        public AccountUserSetting(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, SignInManager<ApplicationUser> signInManager, IOptions<JWT> jwt)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            this.signInManager = signInManager;
            _jwt = jwt.Value;
        }
        public async Task<AccountOutput> Login(InputLogin input)
        {
            string UserName = new MailAddress(input.Email).User ?? input.Email;
            var result = await signInManager.PasswordSignInAsync(UserName, input.Password, true, false);
            if (result.Succeeded)
            {
                var user1 = await userManager.FindByNameAsync(UserName);
                user1.LastLogin=DateTime.Now;
                await userManager.UpdateAsync(user1);
                var jwtSecurityToken = await CreateJwtToken(user1);
                var rolesList = await userManager.GetRolesAsync(user1);
                return new()
                {
                    email = user1.Email,
                    isLogin = true,
                    exToken = jwtSecurityToken.ValidTo,
                    userName = user1.UserName, 
                    token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken),
                    roles = rolesList.ToArray(),
                    error=false
                };
            }
            else
            {
                return new() { isLogin = false, message = "Error in Email Or Password", error = true };
            }
        }

        

        public async Task<AccountOutput> Register(InputRegister input)
        {
            if (await userManager.FindByEmailAsync(input.Email) is not null)
                return new() { message = "Email Is already Registered!", isLogin = false, error = true };

            if (await userManager.FindByNameAsync(input.UserName) is not null)
                return new() { message = "UserName Is already Registered!", isLogin = false, error = true };

            ApplicationUser User = new ApplicationUser()
            {
                Email=input.Email,
                UserName=input.UserName,
                PhoneNumber=input.Phone
            };
           
            var result = await userManager.CreateAsync(User, input.Password);
            if (!result.Succeeded)
            {
                string Error = "";
                foreach (var i in result.Errors)
                    Error += $"{i.Description},";
                return new() { message = Error, isLogin = false,error=true };
            }
            await userManager.AddToRoleAsync(User, "User");
            return new() { message = "Go To Login Page", isLogin = true,error=false };
        }

        public async Task LogOut()
        {
            await signInManager.SignOutAsync();
        }




        //Token
        private async Task<JwtSecurityToken> CreateJwtToken(ApplicationUser user)
        {
            var userClaims = await userManager.GetClaimsAsync(user);
            var roles = await userManager.GetRolesAsync(user);
            var roleClaims = new List<Claim>();

            foreach (var role in roles)
                roleClaims.Add(new Claim("roles", role));

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim("uid", user.Id)
            }
            .Union(userClaims)
            .Union(roleClaims);

            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwt.Key));
            var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);

            var jwtSecurityToken = new JwtSecurityToken(
                issuer: _jwt.IssUser,
                audience: _jwt.Audience,
                claims: claims,
                expires: DateTime.Now.AddDays(_jwt.Expire),
                signingCredentials: signingCredentials);

            return jwtSecurityToken;
        }
    }
}
