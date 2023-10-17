using Assignment_BackEnd.Model.ProductModel;
using Assignment_BackEnd.Model.ProductModel.Input;
using Assignment_BackEnd.Model.ProductModel.OutputProducts;

namespace Assignment_BackEnd.BLL.ProductLayer
{
    public interface IProductSetting
    {
        public Task<OutputProduct> GetAllProduct(int index);
        public Task<OutputProduct> GetNewProduct(int index);
        public Task<OutputProduct> GetWithType(string type,int index);
        public Task<List<Product>> SerchProduct(string name);
        public Task<Product> GetProduct(string Id);
        public Task<inputProduct> AddProduct(IFormFile Icon,List<IFormFile>Imges,inputProduct input);
        public Task<inputProduct>RemoveProduct(string Id);
        public Task<inputProduct> EditProduct(inputProduct input, string id);
        public Task<inputProduct> RemoveImg(string src);
        public Task<inputProduct>ChangeImg(IFormFile img,string src);
        public Task<inputProduct> AddImage(IFormFile Imges, string Id);
    }
}
