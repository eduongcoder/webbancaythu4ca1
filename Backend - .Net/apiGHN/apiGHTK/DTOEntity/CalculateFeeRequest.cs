namespace apiGHTK.DTOEntity
{
    public class CalculateFeeRequest
    {
        public int from_district_id { get; set; }
        public string from_ward_code { get; set; }
        public int service_id { get; set; }
        public int? service_type_id { get; set; } = 2;  // Mặc định là E-Commerce Delivery
        public int to_district_id { get; set; }
        public string to_ward_code { get; set; }
        public int height { get; set; }
        public int length { get; set; }
        public int weight { get; set; }
        public int width { get; set; }
        public int insurance_value { get; set; }
        public int cod_failed_amount { get; set; }
        public string? coupon { get; set; }

        public List<Item2> items { get; set; } // Thêm thông tin sản phẩm nếu có
    }
    public class Item2
    {
        public string name { get; set; }
        public int quantity { get; set; }
        public int length { get; set; }
        public int width { get; set; }
        public int height { get; set; }
        public int weight { get; set; }
    }
}
