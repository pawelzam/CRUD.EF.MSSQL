using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.DB;

public class OrderContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<Order> Orders { get; set; }
}
