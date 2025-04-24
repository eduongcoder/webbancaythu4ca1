using apiGHTK.DTOEntity;
using Newtonsoft.Json;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

public class GHNService
{
    private readonly HttpClient _httpClient;
    private readonly string _apiUrl;
    private readonly string _token;
    private readonly string _shopId;

    public GHNService(HttpClient httpClient, IConfiguration configuration)
    {
        _httpClient = httpClient;
        _apiUrl = configuration["GHN:ApiUrl"];
        _token = configuration["GHN:Token"];
        _shopId = configuration["GHN:ShopId"];

    }

    public async Task<string> CreateOrderAsync(CreateOrderDTO orderData)
    {
        if (string.IsNullOrWhiteSpace(orderData.to_name) ||
            string.IsNullOrWhiteSpace(orderData.to_phone) ||
            string.IsNullOrWhiteSpace(orderData.to_address) ||
            string.IsNullOrWhiteSpace(orderData.required_note))
        {
            throw new Exception("Thiếu thông tin bắt buộc: to_name, to_phone, to_address hoặc required_note.");
        }

        var requestContent = new StringContent(JsonConvert.SerializeObject(orderData), Encoding.UTF8, "application/json");
        var requestUrl = $"{_apiUrl}/shiip/public-api/v2/shipping-order/create";

        var request = new HttpRequestMessage(HttpMethod.Post, requestUrl)
        {
            Content = requestContent
        };

        request.Headers.Add("Token", _token);
        request.Headers.Add("ShopId", _shopId);

        var response = await _httpClient.SendAsync(request);
        var responseString = await response.Content.ReadAsStringAsync();

        if (!response.IsSuccessStatusCode)
        {
            throw new Exception($"GHN API Error: {response.StatusCode} - {responseString}");
        }

        return responseString;
    }
    public async Task<string> GetOrderInfoAsync(OrderInfoRequest orderInfoRequest)
    {
        var requestContent = new StringContent(JsonConvert.SerializeObject(new
        {
            order_code = orderInfoRequest.OrderCode // Gửi mã đơn hàng
        }), Encoding.UTF8, "application/json");
        var requestUrl = $"{_apiUrl}/shiip/public-api/v2/shipping-order/detail";

        var request = new HttpRequestMessage(HttpMethod.Post, requestUrl)
        {
            Content = requestContent
        };

        // Thêm headers vào yêu cầu
        request.Headers.Add("Token", _token);

        var response = await _httpClient.SendAsync(request);
        var responseString = await response.Content.ReadAsStringAsync();
        return responseString;
    }

    //lay token
    public async Task<string> GeneratePrintToken(List<string> orderCodes)
    {
        var requestUrl = "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/a5/gen-token";

        // Đảm bảo sử dụng 'order_codes' thay vì 'orderCodes' trong body
        var requestData = new
        {
            order_codes = orderCodes // Đặt tên là 'order_codes'
        };

        var requestContent = new StringContent(JsonConvert.SerializeObject(requestData), Encoding.UTF8, "application/json");
        var request = new HttpRequestMessage(HttpMethod.Post, requestUrl)
        {
            Content = requestContent
        };

        // Thêm các headers yêu cầu
        request.Headers.Add("Token", _token); // Thay <YOUR_TOKEN> bằng token thật
        request.Headers.Add("ShopId", _shopId); // Thay <YOUR_SHOP_ID> bằng ShopId thật

        var response = await _httpClient.SendAsync(request);
        var responseString = await response.Content.ReadAsStringAsync();

        // Kiểm tra nếu API trả về lỗi
        if (!response.IsSuccessStatusCode)
        {
            throw new Exception($"Failed to generate token: {responseString}");
        }

        var tokenResponse = JsonConvert.DeserializeObject<TokenResponse>(responseString);

        // Kiểm tra token trong response
        return tokenResponse?.data?.token;
    }

    //in
    public async Task PrintOrder(string token)
    {
        var printUrl = $"https://dev-online-gateway.ghn.vn/a5/public-api/printA5?token={token}";
        var request = new HttpRequestMessage(HttpMethod.Get, printUrl);

        // Thêm headers yêu cầu
        request.Headers.Add("Token", _token);

        var response = await _httpClient.SendAsync(request);

        if (response.IsSuccessStatusCode)
        {
            // In thành công, bạn có thể xử lý kết quả ở đây
            var printResult = await response.Content.ReadAsStringAsync();

            // Lưu nội dung HTML vào file tạm thời
            var tempFilePath = Path.Combine(Path.GetTempPath(), "orderPrint.html");
            await File.WriteAllTextAsync(tempFilePath, printResult);

            // Mở file HTML trong trình duyệt mặc định của người dùng
            System.Diagnostics.Process.Start("explorer", tempFilePath);
        }
        else
        {
            Console.WriteLine("Failed to print order.");
        }
    }



    public async Task<string> CalculateFeeAsync(CalculateFeeRequest request)
    {
        var requestContent = new StringContent(JsonConvert.SerializeObject(request), Encoding.UTF8, "application/json");
        var requestUrl = $"{_apiUrl}/shiip/public-api/v2/shipping-order/fee";

        var httpRequestMessage = new HttpRequestMessage(HttpMethod.Post, requestUrl)
        {
            Content = requestContent
        };

        // Thêm các header vào yêu cầu
        httpRequestMessage.Headers.Add("Token", _token);
        httpRequestMessage.Headers.Add("ShopId", _shopId.ToString());

        var response = await _httpClient.SendAsync(httpRequestMessage);
        var responseString = await response.Content.ReadAsStringAsync();

        return responseString;
    }
    // Hủy đơn hàng
    public async Task<string> CancelOrderAsync(CancelOrderRequest cancelRequest)
    {
        // Đảm bảo sử dụng URL đúng cho môi trường bạn đang làm việc (Production hoặc Test)
        var requestUrl = "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/switch-status/cancel";  // Cập nhật URL
        var requestContent = new StringContent(JsonConvert.SerializeObject(new
        {
            order_codes = cancelRequest.OrderCodes // Gửi danh sách order_codes
        }), Encoding.UTF8, "application/json");

        var request = new HttpRequestMessage(HttpMethod.Post, requestUrl)
        {
            Content = requestContent
        };

        // Thêm các headers yêu cầu
        request.Headers.Add("Token", _token);
        request.Headers.Add("ShopId", _shopId);

        // Gửi yêu cầu
        var response = await _httpClient.SendAsync(request);
        var responseString = await response.Content.ReadAsStringAsync();
        return responseString;
    }


    // Cập nhật đơn hàng
    public async Task<string> UpdateOrderAsync(UpdateOrderRequest updateOrderRequest)
    {
        var requestUrl = "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/update"; // URL API

        var requestContent = new StringContent(JsonConvert.SerializeObject(updateOrderRequest), Encoding.UTF8, "application/json");

        var request = new HttpRequestMessage(HttpMethod.Post, requestUrl)
        {
            Content = requestContent
        };

        // Thêm headers vào yêu cầu
        request.Headers.Add("Token", _token);
        request.Headers.Add("ShopId", _shopId);

        var response = await _httpClient.SendAsync(request);
        var responseString = await response.Content.ReadAsStringAsync();
        return responseString;
    }

    public async Task<ApiResponseDTO<ProvinceDTO>> GetProvinceAsync()
    {
        var requestUrl = $"{_apiUrl}/shiip/public-api/master-data/province"; // URL để lấy danh sách tỉnh

        // Tạo một đối tượng HttpRequestMessage và cấu hình request
        var request = new HttpRequestMessage(HttpMethod.Get, requestUrl);

        // Thêm header Token vào yêu cầu
        request.Headers.Add("Token", _token);

        // Gửi yêu cầu HTTP và nhận phản hồi
        var response = await _httpClient.SendAsync(request);
        var responseString = await response.Content.ReadAsStringAsync();

        // Kiểm tra mã trạng thái của phản hồi
        if (!response.IsSuccessStatusCode)
        {
            throw new Exception($"GHN API Error: {response.StatusCode} - {responseString}");
        }

        // Chuyển đổi phản hồi JSON thành đối tượng ApiResponseDTO<ProvinceDTO>
        var result = JsonConvert.DeserializeObject<ApiResponseDTO<ProvinceDTO>>(responseString);

        return result;
    }

    public async Task<ApiResponseDTO<DistrictDTO>> GetDistrictAsync(int provinceId)
    {
        var requestUrl = $"{_apiUrl}/shiip/public-api/master-data/district";

        var requestData = new
        {
            province_id = provinceId
        };

        var requestContent = new StringContent(JsonConvert.SerializeObject(requestData), Encoding.UTF8, "application/json");

        var request = new HttpRequestMessage(HttpMethod.Post, requestUrl)
        {
            Content = requestContent
        };

        request.Headers.Add("Token", _token);

        var response = await _httpClient.SendAsync(request);
        var responseString = await response.Content.ReadAsStringAsync();

        if (!response.IsSuccessStatusCode)
        {
            throw new Exception($"GHN API Error: {response.StatusCode} - {responseString}");
        }

        var result = JsonConvert.DeserializeObject<ApiResponseDTO<DistrictDTO>>(responseString);

        return result;
    }

    public async Task<ApiResponseDTO<WardDTO>> GetWardAsync(int districtId)
    {
        var requestUrl = $"{_apiUrl}/shiip/public-api/master-data/ward";

        var requestData = new
        {
            district_id = districtId
        };

        var requestContent = new StringContent(JsonConvert.SerializeObject(requestData), Encoding.UTF8, "application/json");

        var request = new HttpRequestMessage(HttpMethod.Post, requestUrl)
        {
            Content = requestContent
        };

        request.Headers.Add("Token", _token);

        var response = await _httpClient.SendAsync(request);
        var responseString = await response.Content.ReadAsStringAsync();

        if (!response.IsSuccessStatusCode)
        {
            throw new Exception($"GHN API Error: {response.StatusCode} - {responseString}");
        }

        var result = JsonConvert.DeserializeObject<ApiResponseDTO<WardDTO>>(responseString);

        return result;
    }




}

