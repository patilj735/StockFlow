namespace StoreDesk.API.DTOs;

public class DashboardStatsDto
{
    public int TotalItems { get; set; }
    public int TotalCategories { get; set; }
    public int LowStockItems { get; set; }
    public int ActiveTransactions { get; set; }
    public int ReturnedTransactions { get; set; }
}

public class LowStockItemDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int Quantity { get; set; }
    public string CategoryName { get; set; } = string.Empty;
}

public class RecentTransactionDto
{
    public int Id { get; set; }
    public string ItemName { get; set; } = string.Empty;
    public string BorrowerName { get; set; } = string.Empty;
    public int Quantity { get; set; }
    public bool IsReturned { get; set; }
    public DateTime IssuedAt { get; set; }
}