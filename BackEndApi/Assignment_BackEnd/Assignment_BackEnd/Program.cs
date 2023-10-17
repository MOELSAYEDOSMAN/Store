using Assignment_BackEnd.BLL.EditImageLocation;
using Assignment_BackEnd._JWT;
using Assignment_BackEnd.Model;
using Assignment_BackEnd.Model.UserModel;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Serialization;
using System.Text;
using Assignment_BackEnd.BLL.Account;
using Assignment_BackEnd.BLL.CategoryLayer;
using Assignment_BackEnd.BLL.ProductLayer;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<DataBaseContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddIdentity<ApplicationUser, IdentityRole>(options =>
{
    options.SignIn.RequireConfirmedEmail = false;
    options.Password.RequiredLength = 8;
    options.User.RequireUniqueEmail = true;
}).AddEntityFrameworkStores<DataBaseContext>()
.AddDefaultTokenProviders().AddRoles<IdentityRole>()
;
builder.Services.AddHttpContextAccessor();


builder.Services.AddScoped<JWT, JWT>();
builder.Services.Configure<JWT>(builder.Configuration.GetSection("JWT"));
builder.Services.AddAuthentication(o =>
{
    o.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    o.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(o =>
{
    o.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["JWT:IssUser"],
        ValidAudience = builder.Configuration["JWT:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Key"]))
    };
});


builder.Services.AddControllers().AddNewtonsoftJson(option =>
{
    option.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
    option.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle


builder.Services.AddScoped<ISaveImage, SaveImage>();
builder.Services.AddScoped<IAccountUserSetting, AccountUserSetting>();
builder.Services.AddScoped<ICategorySetting, CategorySetting>();
builder.Services.AddScoped<IProductSetting, ProductSetting>();


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
options.AddPolicy("MyPolicy",
bui => bui.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod())
);
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("MyPolicy");
app.UseStaticFiles();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
