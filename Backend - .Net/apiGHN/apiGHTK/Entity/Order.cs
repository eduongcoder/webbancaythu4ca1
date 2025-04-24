//using Newtonsoft.Json;
//using System.ComponentModel.DataAnnotations;

//public class Order
//{
//    [Key]
//    public string Id { get; set; } // ID không được NULL


//    public string OrderCode { get; set; }  // Thêm trường OrderCode vào đây


//    public string PickName { get; set; } // Có thể NULL
//    public string PickAddress { get; set; } // Có thể NULL
//    public string PickProvince { get; set; } // Có thể NULL
//    public string PickDistrict { get; set; } // Có thể NULL
//    public string PickWard { get; set; } // Có thể NULL
//    public string PickTel { get; set; } // Có thể NULL

//    public string Tel { get; set; } // Có thể NULL
//    public string Name { get; set; } // Có thể NULL

//    public string Address { get; set; } // Có thể NULL
//    public string Province { get; set; } // Có thể NULL
//    public string District { get; set; } // Có thể NULL
//    public string Ward { get; set; } // Có thể NULL
//    public string Hamlet { get; set; } // Có thể NULL

//    public string IsFreeship { get; set; } // Có thể NULL
//    public string PickDate { get; set; } // Có thể NULL
//    public int? PickMoney { get; set; } // Nullable int
//    public string Note { get; set; } // Có thể NULL
//    public int? Value { get; set; } // Nullable int

//    public string Transport { get; set; } // Có thể NULL
//    public string PickOption { get; set; } // Có thể NULL
//    public string DeliverOption { get; set; } // Có thể NULL

//    public ICollection<OrderItem> OrderItems { get; set; } // Có thể NULL
//    public ShippingInfo ShippingInfo { get; set; } // Có thể NULL
//    public User User { get; set; } // Có thể NULL
//    public long? UserId { get; set; } // Nullable long (Khóa ngoại User có thể NULL)
//}
