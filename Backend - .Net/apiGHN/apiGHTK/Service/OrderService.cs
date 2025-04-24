//using apiGHTK.Repository;
//using System.Threading.Tasks;

//public class OrderService
//{
//    private readonly OrderRepository _orderRepository; // Interface của repository

//    public OrderService(OrderRepository orderRepository)
//    {
//        _orderRepository = orderRepository; // Inject repository vào service
//    }

//    public async Task<Order> SaveOrderToDatabase(Order Order)
//    {
//        // Tạo đối tượng Order từ OrderRequest
       

//        // Lưu vào database thông qua repository
//        return await _orderRepository.CreateOrderAsync(Order);
//    }
//}
