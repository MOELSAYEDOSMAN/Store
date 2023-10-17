namespace Assignment_BackEnd.BLL.EditImageLocation
{
    public interface ISaveImage
    {
        public Task<string> UploadImage(string src, IFormFile img);
        public Task<List<string>> UploadImagesList(string src, List<IFormFile> imgs);
        public Task<bool> DeleteImage(string src);
        public Task<bool> DeletsImages(List<string> src);
        public Task<bool> ChangeImg(string src, IFormFile img);
        
    }
}
