//namespace apiGHTK.Mapper;
//using static System.Runtime.InteropServices.JavaScript.JSType;


//public class OrderMapper : Profile
//{
//    public OrderMapper()
//    {
//        // Chuyển đổi từ CreateOrderDTO sang OrderRequest
//        CreateMap<CreateOrderDTO, OrderRequest>()
//            .ForMember(dest => dest.Order, opt => opt.MapFrom(src => new Order
//            {
//                PaymentTypeId = src.PaymentTypeId,
//                Note = src.Note,
//                RequiredNote = src.RequiredNote,
//                FromName = src.FromName,
//                FromPhone = src.FromPhone,
//                FromAddress = src.FromAddress,
//                FromWardName = src.FromWardName,
//                FromDistrictName = src.FromDistrictName,
//                FromProvinceName = src.FromProvinceName,
//                ReturnPhone = src.ReturnPhone,
//                ReturnAddress = src.ReturnAddress,
//                ReturnDistrictId = src.ReturnDistrictId,
//                ReturnWardCode = src.ReturnWardCode,
//                ClientOrderCode = src.ClientOrderCode,
//                ToName = src.ToName,
//                ToPhone = src.ToPhone,
//                ToAddress = src.ToAddress,
//                ToWardCode = src.ToWardCode,
//                ToDistrictId = src.ToDistrictId,
//                CodAmount = src.CodAmount,
//                Content = src.Content,
//                Weight = src.Weight,
//                Length = src.Length,
//                Width = src.Width,
//                Height = src.Height,
//                InsuranceValue = src.InsuranceValue,
//                ServiceId = src.ServiceId,
//                ServiceTypeId = src.ServiceTypeId,
//                Coupon = src.Coupon,
//                PickShift = src.PickShift,
//                // Convert items
//                OrderItems = src.Items.Select(item => new OrderItem
//                {
//                    Name = item.Name,
//                    Code = item.Code,
//                    Quantity = item.Quantity,
//                    Price = item.Price,
//                    Length = item.Length,
//                    Width = item.Width,
//                    Height = item.Height,
//                    Weight = item.Weight,
//                    Category = new Category { Level1 = item.Category.Level1 }
//                }).ToList()
//            }));
//    }
//}
