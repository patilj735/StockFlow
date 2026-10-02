namespace StoreDesk.API.Models;

public class Item
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public decimal Price { get; set; }
    public int Quantity { get; set; }

    public int LowStockThreshold { get; set; } = 5;

    public int CategoryId { get; set; }
    public Category? Category { get; set; }

    public ICollection<Transaction> Transactions
    { 
        get; set; 
    } = new List<Transaction>();
}