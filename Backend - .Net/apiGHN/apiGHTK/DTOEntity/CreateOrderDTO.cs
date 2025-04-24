public class CreateOrderDTO
{
    public int payment_type_id { get; set; }
    public string note { get; set; }
    public string required_note { get; set; } // Giá trị phải là 1 trong 3 giá trị hợp lệ
    public string from_name { get; set; }
    public string from_phone { get; set; }
    public string from_address { get; set; }
    public string from_ward_name { get; set; }
    public string from_district_name { get; set; }
    public string from_province_name { get; set; }
    public string to_name { get; set; }
    public string to_phone { get; set; }
    public string to_address { get; set; }
    public string to_ward_code { get; set; }
    public int to_district_id { get; set; }
    public int cod_amount { get; set; }
    public string content { get; set; }
    public int weight { get; set; }
    public int length { get; set; }
    public int width { get; set; }
    public int height { get; set; }
    public int service_id { get; set; }
    public int service_type_id { get; set; }
    public List<int> pick_shift { get; set; }
    public List<Item> items { get; set; }
}

public class Item
{
    public string name { get; set; }
    public string code { get; set; }
    public int quantity { get; set; }
    public int price { get; set; }
    public int length { get; set; }
    public int width { get; set; }
    public int height { get; set; }
    public int weight { get; set; }
}
