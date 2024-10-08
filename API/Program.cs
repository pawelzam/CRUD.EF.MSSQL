using API.DB;
using API.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<OrderContext>(b =>
{
    b.UseSqlServer(builder.Configuration.GetConnectionString("DB"));
});

builder.Services.AddScoped<IOrderRepository, OrderRepository>();

builder.Services.AddCors(s =>
{
    s.AddDefaultPolicy(b =>
    {
        b.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();



app.MapGet("/orders", async (IOrderRepository repository, CancellationToken cancellationToken) => await repository.GetOrdersAsync(cancellationToken))
.WithName("Get orders")
.WithOpenApi();

app.MapPost("/orders",
        async (Order order, IOrderRepository repository, CancellationToken cancellationToken) =>
            await repository.AddOrderAsync(order, cancellationToken))
    .WithName("Add order")
    .WithOpenApi();

app.UseCors();

app.Run();

internal record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
