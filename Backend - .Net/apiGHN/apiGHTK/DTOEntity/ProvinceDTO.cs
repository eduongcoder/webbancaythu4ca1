namespace apiGHTK.DTOEntity
{
    public class ProvinceDTO
    {
        public int ProvinceID { get; set; }
        public string ProvinceName { get; set; }
        public string Code { get; set; }
    }

    public class ApiResponseDTO<T>
    {
        public int Code { get; set; }
        public string Message { get; set; }
        public List<T> Data { get; set; }
    }
}
