namespace Assignment_BackEnd.Model.UserModel
{
    public class AccountOutput
    {
        public bool isLogin { get; set; }
        public bool error { get; set; }
        public string message { get; set; }
        public string token { get; set; }
        public string[] roles { get; set; }
        public string userName { get; set; }
        public string email { get; set; }
        public DateTime exToken { get; set; }

    }
}
