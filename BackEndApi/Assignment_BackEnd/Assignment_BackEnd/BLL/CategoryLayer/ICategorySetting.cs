using Assignment_BackEnd.Model.CategoryModel.Input;
using Assignment_BackEnd.Model.CategoryModel;



namespace Assignment_BackEnd.BLL.CategoryLayer
{
    public interface ICategorySetting
    {
        public Task<InputCategory> PushCategory(InputCategory input);
        public Task<InputCategory> PopCategory(int index);
        public Task<InputCategory> EditCategory(InputCategory input,int index);
        public Task<List<Category>> GetAllCategorys();
        public Task<Category> GetCategory(int index);

    }
}
