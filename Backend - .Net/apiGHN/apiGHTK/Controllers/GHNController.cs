using apiGHTK.DTOEntity;
using apiGHTK.Entity;
using apiGHTK.Repository; // Thêm dòng này đầu file
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class GHNController : ControllerBase
{
    private readonly GHNService _ghnService;
    //private readonly OrderService _orderService; // Dịch vụ để lưu đơn hàng vào cơ sở dữ liệu
    private readonly OrderRepository _orderRepository; // Repository để lưu orderId vào DB

    public GHNController(GHNService ghnService, OrderRepository orderRepository)
    {
        _ghnService = ghnService;
        //_orderService = orderService;
        _orderRepository = orderRepository;


    }

    [HttpPost("create-order")]
    public async Task<IActionResult> CreateOrder([FromBody] CreateOrderDTO orderData)
    {
        var result = await _ghnService.CreateOrderAsync(orderData);

        if (result.Contains("Error"))
        {
            return BadRequest(result);  // Trả về lỗi nếu có từ GHN
        }

        // Deserialize JSON vào OrderResponse
        var orderResponse = JsonConvert.DeserializeObject<OrderResponse>(result);

        // Kiểm tra nếu OrderCode tồn tại trong response
        string orderCode = orderResponse.Data.order_code;

        // Lấy các loại phí từ response
        decimal total_fee = orderResponse.Data.total_fee;
        

        // Lưu orderCode và các loại phí vào cơ sở dữ liệu
        await _orderRepository.SaveOrderCodeAsync(orderCode, total_fee);

        return Ok(new { OrderCode = orderCode });
    }

    private string GetOrderIdFromResponse(string response)
    {
       
        var jsonResponse = JsonConvert.DeserializeObject<dynamic>(response);
        return jsonResponse.data.order_code; // Giả sử "order_code" là orderId
    }
  
    [HttpPost("order-info")]
    public async Task<IActionResult> GetOrderInfo([FromBody] OrderInfoRequest orderInfoRequest)
    {
        var result = await _ghnService.GetOrderInfoAsync(orderInfoRequest);

        if (result.Contains("Error"))
        {
            return BadRequest(result);  // Trả về lỗi nếu có từ GHN
        }

        return Ok(result);  // Trả về kết quả từ GHN
    }
    [HttpPost("calculate-fee")]
    public async Task<IActionResult> CalculateFee([FromBody] CalculateFeeRequest request)
    {
        var result = await _ghnService.CalculateFeeAsync(request);

        if (string.IsNullOrEmpty(result))
        {
            return BadRequest("Không thể tính phí vận chuyển.");
        }

        return Ok(result);
    }
    [HttpPost("cancel-order")]
    public async Task<IActionResult> CancelOrder([FromBody] CancelOrderRequest cancelRequest)
    {
        var result = await _ghnService.CancelOrderAsync(cancelRequest);
        return Ok(result);
    }

    [HttpPost("print-order")]
    public async Task<IActionResult> PrintOrder([FromBody] PrintOrderRequest request)
    {
        var token = await _ghnService.GeneratePrintToken(request.OrderCodes);
        if (!string.IsNullOrEmpty(token))
        {
            await _ghnService.PrintOrder(token); // In đơn hàng với token
            return Ok(new { message = "Order printed successfully." });
        }

        return BadRequest("Failed to generate token for printing.");
    }

    public class PrintOrderRequest
    {
        public List<string> OrderCodes { get; set; }
    }

    [HttpGet("provinces")]
    public async Task<IActionResult> GetProvinces()
    {
       
            // Gọi phương thức GetProvinceAsync trong GHNService
            var provinceData = await _ghnService.GetProvinceAsync();

            // Trả về dữ liệu tỉnh dưới dạng JSON
            return Ok(new { message = "Success", data = provinceData });
       
        
    }
    [HttpGet("districts/{provinceId}")]
    public async Task<IActionResult> GetDistricts(int provinceId)
    {
        try
        {
            // Gọi phương thức GetDistrictAsync trong GHNService với provinceId
            var districtData = await _ghnService.GetDistrictAsync(provinceId);

            // Trả về kết quả dưới dạng JSON
            return Ok(new { message = "Success", data = districtData });
        }
        catch (Exception ex)
        {
            // Nếu có lỗi, trả về thông báo lỗi
            return BadRequest(new { message = "Error", error = ex.Message });
        }
    }
    [HttpGet("wards/{districtId}")]
    public async Task<IActionResult> GetWards(int districtId)
    {
        try
        {
            // Gọi phương thức GetWardAsync trong GHNService với districtId
            var wardData = await _ghnService.GetWardAsync(districtId);

            // Trả về kết quả dưới dạng JSON
            return Ok(new { message = "Success", data = wardData });
        }
        catch (Exception ex)
        {
            // Nếu có lỗi, trả về thông báo lỗi
            return BadRequest(new { message = "Error", error = ex.Message });
        }
    }
    //[HttpPost("update-order")]
    //public async Task<IActionResult> UpdateOrder([FromBody] UpdateOrderRequest updateOrderRequest)
    //{
    //    var result = await _ghnService.UpdateOrderAsync(updateOrderRequest);

    //    if (result.Contains("Error"))
    //    {
    //        return BadRequest(result);  
    //    }

    //    return Ok(new { Message = "Order updated successfully", Data = result });
    //}
}
