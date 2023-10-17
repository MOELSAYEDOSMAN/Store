namespace Assignment_BackEnd.BLL.EditImageLocation
{
    public class SaveImage:ISaveImage
    {

        private readonly IWebHostEnvironment env;
        public SaveImage(IWebHostEnvironment env)
        {
            this.env = env;
        }
        public async Task<bool> DeleteImage(string src)
        {
            var filepath = Path.Combine(env.ContentRootPath + System.IO.Path.DirectorySeparatorChar, $@"wwwroot/Images/{src}");
            if (System.IO.File.Exists(filepath))
            {
                System.IO.File.Delete(filepath);
                return true;
            }
            else
            {
                return false;
            }
        }

        public async Task<bool> DeletsImages(List<string> src)
        {
            bool result = true;

            foreach (string s in src)
            {
                if (System.IO.File.Exists(s))
                {
                    System.IO.File.Delete(s);
                }
                else
                {
                    result = false;
                }
            }
            return result;
        }

        public async Task<string> UploadImage(string src, IFormFile img)
        {
            string NameImg = Guid.NewGuid().ToString() + ".jpg";
            var filepath = Path.Combine(env.ContentRootPath + System.IO.Path.DirectorySeparatorChar, $@"wwwroot/Images/{src}", NameImg);
            using (var steam = System.IO.File.Create(filepath))
            {
                await img.CopyToAsync(steam);
            }
            return NameImg;
        }

        public async Task<bool> ChangeImg(string src, IFormFile img)
        {
            await DeleteImage(src);
            src = Path.Combine(env.ContentRootPath + System.IO.Path.DirectorySeparatorChar, $@"wwwroot/Images/{src}");
            using (var steam = System.IO.File.Create(src))
            {
                await img.CopyToAsync(steam);
            }
            return true;
        }

        public async Task<List<string>> UploadImagesList(string src, List<IFormFile> imgs)
        {
            List<string> images = new List<string>();
            foreach (IFormFile file in imgs)
            {
                string NameImg = Guid.NewGuid().ToString() + ".jpg";
                var filepath = Path.Combine(env.ContentRootPath + System.IO.Path.DirectorySeparatorChar, $@"wwwroot/Images/{src}", NameImg);
                using (var steam = System.IO.File.Create(filepath))
                {
                    await file.CopyToAsync(steam);
                }
                images.Add(NameImg);
            }
            return images;
        }
    }
}