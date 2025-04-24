namespace apiGHTK.DTOEntity
{
    public class CancelOrderRequest
    {
        public List<string> OrderCodes { get; set; } // Thay đổi sang kiểu List<string> để chứa nhiều mã đơn hàng
    }
}
