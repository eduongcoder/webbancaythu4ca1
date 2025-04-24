namespace apiGHTK.DTOEntity
{
    public class ShippingFeeRequest
    {
        public int FromDistrictId { get; set; }
        public int ToDistrictId { get; set; }
        public double Weight { get; set; }
        public int Length { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
        public int ServiceId { get; set; }
    }
}
