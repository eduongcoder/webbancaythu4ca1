//using System.ComponentModel.DataAnnotations.Schema;
//using System.ComponentModel.DataAnnotations;

//public class OrderItem
//{
//    [Key]
//    public string Id { get; set; }

//    [ForeignKey("Order")] // Đảm bảo EF Core hiểu đây là khóa ngoại
//    public string OrderId { get; set; }  // Kiểu dữ liệu phải trùng với Order.Id

//    public Order Order { get; set; } // Thêm Navigation Property

//    public Product Product { get; set; }
//    public int Quantity { get; set; }
//    public double Price { get; set; }
//}
