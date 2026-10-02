namespace StoreDesk.API.Models;

public class Transaction
{
    public int Id { get; set; }
    public int ItemId { get; set; }
    public Item? Item { get; set; }
    public string BorrowerName { get; set; } = string.Empty;
    public string BorrowerEmail { get; set; } = string.Empty;
    public int Quantity { get; set; }
    public DateTime IssuedAt { get; set; }
    public DateTime? ReturnedAt { get; set; }
    public bool IsReturned { get; set; }
}