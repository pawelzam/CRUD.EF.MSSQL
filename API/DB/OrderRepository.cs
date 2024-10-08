using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.DB;

public interface IOrderRepository
{
    Task<IEnumerable<Order>> GetOrdersAsync(CancellationToken cancellationToken);

    Task AddOrderAsync(Order order, CancellationToken cancellationToken);
}

public class OrderRepository(OrderContext context): IOrderRepository
{
    public async Task<IEnumerable<Order>> GetOrdersAsync(CancellationToken cancellationToken)
    {
        return await context.Orders.ToListAsync(cancellationToken);
    }

    public async Task AddOrderAsync(Order order, CancellationToken cancellationToken)
    {
        context.Orders.Add(order);
        await context.SaveChangesAsync(cancellationToken);
    }
}
