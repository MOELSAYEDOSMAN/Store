using Assignment_BackEnd.BLL.ProductLayer;
using Assignment_BackEnd.Model.ProductModel;
using Assignment_BackEnd.Model.ProductModel.Input;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Assignment_BackEnd.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        public readonly IProductSetting settingProduct;
        public ProductController(IProductSetting _settingProduct)
        {
            settingProduct= _settingProduct;
        }

        [HttpGet("GetAllProduct")]
        public async Task<IActionResult> GetAllProduct(int index)
        {
            var r = await settingProduct.GetAllProduct(index);
            r.Products = ConverSrc(r.Products);
            return Ok(r);
        }

        [HttpGet("GetNewProduct")]
        public async Task<IActionResult> GetNewProduct(int index)
        {
            var r = await settingProduct.GetNewProduct(index);
            r.Products = ConverSrc(r.Products);
            return Ok(r);
        }

        [HttpGet("GetWithType")]
        public async Task<IActionResult> GetWithType(string type,int index)
        {
            var r = await settingProduct.GetWithType(type, index);
            r.Products = ConverSrc(r.Products);
            return Ok(r);
        }

        [HttpGet("GetProduct")]
        public async Task<IActionResult> GetProduct(string Id)
        {
            return Ok(ConverSrcSingle(await settingProduct.GetProduct(Id)));
        }
        [HttpGet("SerchProduct")]
        public async Task<IActionResult> SerchProduct(string serch)
        {
            return Ok(ConverSrc(await settingProduct.SerchProduct(serch)));
        }

        [HttpGet("GetProductEdit"),Authorize(Roles ="Admin")]
        public async Task<IActionResult> GetProductEdit(string Id)
        {
            return Ok(new Product[] { ConverSrcSingle(await settingProduct.GetProduct(Id)) , await settingProduct.GetProduct(Id) });
        }

        [HttpGet("DelteProduct"), Authorize(Roles ="Admin")]
        public async Task<IActionResult> DelteProduct(string Id)
        {
            return Ok(await settingProduct.RemoveProduct(Id));
        }
        [HttpGet("RemoveImg"), Authorize(Roles = "Admin")]
        public async Task<IActionResult> RemoveImg(string src)
        {
            return Ok(await settingProduct.RemoveImg(src));
        }
        [HttpPut("ChangeImg"), Authorize(Roles = "Admin")]
        public async Task<IActionResult> ChangeImg(IFormFile Img,string src)
        {
            return Ok(await settingProduct.ChangeImg(Img,src));
        }
        [HttpPost("AddProduct"),Authorize(Roles = "Admin")]
        public async Task<IActionResult>AddProduct(IFormFile Icon, List<IFormFile> Imgs, IFormCollection input)
        {
            var dataProduct = JsonConvert.DeserializeObject<inputProduct>(input["input"]);
            return Ok(await _AddProduct(Icon, Imgs, dataProduct));
        }
        private async Task<inputProduct> _AddProduct(IFormFile Icon, List<IFormFile> Imgs, inputProduct input)
        {
            if (!ModelState.IsValid || Imgs.Count == 0)
                return new()
                {
                    message = "Error In Input",
                    error = true,
                    save = false
                };
            else
                return await settingProduct.AddProduct(Icon,Imgs, input);
        }
        [HttpPut("EditInformationProduct"), Authorize(Roles = "Admin")]
        public async Task<IActionResult> EditInformationProduct(inputProduct input,string id)
        {
            return Ok(await settingProduct.EditProduct(input,id));
        }
        [HttpPost("UploadImage"), Authorize(Roles = "Admin")]
        public async Task<IActionResult> AddImage(IFormFile Imges,string Id)
        {
            return Ok(await settingProduct.AddImage(Imges, Id));
        }

        private List<Product> ConverSrc(List<Product>? s)
        {
            if (s is not null)
            {
                for (int i = 0; i < s.Count; i++)
                {
                    s[i] = ConverSrcSingle(s[i]);
                }

            }
            return s;
        }
        private Product ConverSrcSingle(Product s)
        {
            if (s is not null)
            {
                if (s?.ProductImages is not null)
                {
                    foreach (var img in s?.ProductImages)
                    {
                        img.Src = $"{this.Request.Scheme}://{this.Request.Host}/Images/Product/{img?.Src}";
                    }
                }
               
                s.Icon = $"{this.Request.Scheme}://{this.Request.Host}/Images/Product/{s.Icon}";
            }
            return s;
        }
    }
}
