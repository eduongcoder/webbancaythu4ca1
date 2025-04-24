namespace apiGHTK.DTOEntity
{
    public class UpdateOrderRequest
    {
        public string order_code { get; set; }  // Mã đơn hàng GHN (trường yêu cầu)

        public string from_name { get; set; }
        public string from_phone { get; set; }
        public string from_address { get; set; }
        public string from_ward_code { get; set; }

        public string to_name { get; set; }
        public string to_phone { get; set; }
        public string to_address { get; set; }
        public string to_ward_code { get; set; }
        public int to_district_id { get; set; }

        public string return_phone { get; set; }
        public string return_address { get; set; }
        public int return_district_id { get; set; }
        public string return_ward_code { get; set; }

        public string client_order_code { get; set; }  // Mã đơn hàng khách hàng
        public int cod_amount { get; set; }
        public string content { get; set; }
        public int weight { get; set; }
        public int length { get; set; }
        public int width { get; set; }
        public int height { get; set; }

        public int pick_station_id { get; set; }
        public int insurance_value { get; set; }
        public string coupon { get; set; } // Mã giảm giá
        public int payment_type_id { get; set; }  // 1: Shop/Seller, 2: Buyer/Consignee
        public string note { get; set; }
        public string required_note { get; set; }  // Ghi chú yêu cầu: CHOTHUHANG, CHOXEMHANGKHONGTHU, KHONGCHOXEMHANG

        public List<int> pick_shift { get; set; }  // Ca lấy hàng
        public List<Item> items { get; set; }  // Danh sách sản phẩm
    }

}
