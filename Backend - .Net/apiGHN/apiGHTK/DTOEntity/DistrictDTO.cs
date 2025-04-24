namespace apiGHTK.DTOEntity
{
    public class DistrictDTO
    {
        public int DistrictID { get; set; }
        public string DistrictName { get; set; }
        public string Code { get; set; }
    }

    public class WardDTO
    {
        public string WardCode { get; set; }
        public string WardName { get; set; }
        public int DistrictID { get; set; }
    }

}
