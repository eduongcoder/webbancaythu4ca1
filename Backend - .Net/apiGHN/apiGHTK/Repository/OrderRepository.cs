namespace apiGHTK.Repository;

using apiGHTK.Entity;
using Microsoft.EntityFrameworkCore;



public class OrderRepository 
{
    private readonly AppDbContext _context;

    public OrderRepository(AppDbContext context)
    {
        _context = context;
    }

    //public async Task<Order> CreateOrderAsync(Order order)
    //{
    //    _context.Orders.Add(order);
    //    await _context.SaveChangesAsync();
    //    return order;
    //}

    //public async Task SaveOrderIdAsync(string orderId)
    //{
    //    var order = new Order { Id = orderId };
    //    _context.Orders.Add(order);
    //    await _context.SaveChangesAsync();
    //}
    public async Task SaveOrderCodeAsync(string orderCode, decimal total_fee)
    {
        // Tạo một đối tượng OrderData và gán giá trị cho các thuộc tính
        var orderData = new OrderData
        {
            order_code = orderCode,
            Id = orderCode,  // Gán Id bằng với order_code nếu cần thiết
            total_fee= total_fee
        };

        // Thêm đối tượng vào DbSet
        _context.orderdatas.Add(orderData);

        // Lưu thay đổi vào cơ sở dữ liệu
        await _context.SaveChangesAsync();
    }


}