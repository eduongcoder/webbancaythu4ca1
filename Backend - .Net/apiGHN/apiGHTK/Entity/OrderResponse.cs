using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace apiGHTK.Entity
{
    public class OrderResponse
    {
        [JsonProperty("data")]
        public OrderData Data { get; set; }
        [Key]  // Đảm bảo bạn có thuộc tính [Key] cho khóa chính
        public int Id { get; set; }  // Khóa chính

        // Nếu có thêm các trường khác trong response, bạn có thể thêm chúng vào đây.
    }
    public class OrderData
    {
        [Key]  // Đảm bảo bạn có thuộc tính [Key] cho khóa chính
        public string Id { get; set; }  // Khóa chính (Id là chuỗi)

        public string order_code { get; set; }

        public decimal total_fee { get; set; }


    }


}
