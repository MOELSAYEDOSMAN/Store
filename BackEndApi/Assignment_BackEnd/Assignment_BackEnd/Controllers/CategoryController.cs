using Assignment_BackEnd.BLL.CategoryLayer;
using Assignment_BackEnd.Model.CategoryModel.Input;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Assignment_BackEnd.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        public readonly ICategorySetting categorySetting;
        public CategoryController(ICategorySetting _categorySetting)
        {
            categorySetting = _categorySetting;
        }


        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await categorySetting.GetAllCategorys());
        }

        [HttpGet("GetCategory")]
        public async Task<IActionResult> GetCategory(int id)
        {
            return Ok(await categorySetting.GetCategory(id));
        }

        [HttpGet("DeleteCategory"),Authorize(Roles ="Admin")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            Console.WriteLine("Delte");
            return Ok(await categorySetting.PopCategory(id));
        }

        [HttpPut("EditCategory"), Authorize(Roles = "Admin")]
        public async Task<IActionResult> EditCategory(int id, InputCategory input)
        {
            if(!ModelState.IsValid)
                return BadRequest(new InputCategory()
                {
                    message="Error In Inputs",
                    save=false
                });
            return Ok(await categorySetting.EditCategory(input,id));
        }
        [HttpPost("AddCategory"), Authorize(Roles = "Admin")]
        public async Task<IActionResult> AddCategory(InputCategory input)
        {
            if (!ModelState.IsValid)
                return BadRequest(new InputCategory()
                {
                    message = "Error In Inputs",
                    save = false
                });
            return Ok(await categorySetting.PushCategory(input));
        }
    }
}
