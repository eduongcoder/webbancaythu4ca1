public class TokenResponse
{
    public string Code { get; set; } // Mã trả về từ API (Ví dụ: 200)
    public string Message { get; set; } // Thông điệp trả về từ API
    public TokenData data { get; set; } // Token nằm trong Data

    public class TokenData
    {
        public string token { get; set; } // Token in order
    }
}
