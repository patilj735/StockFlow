using StoreDesk.API.DTOs;

namespace StoreDesk.API.Interfaces;

public interface IDashboardService
{
    Task<DashboardStatsDto> GetStatsAsync();
    
    Task<IEnumerable<LowStockItemDto>>GetLowStockItemsAsync();

    Task<IEnumerable<RecentTransactionDto>>GetRecentTransactionsAsync();
}
