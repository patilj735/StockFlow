using Microsoft.EntityFrameworkCore;
using StoreDesk.API.Data;
using StoreDesk.API.DTOs;
using StoreDesk.API.Interfaces;

namespace StoreDesk.API.Services;

public class DashboardService : IDashboardService
{
    private readonly AppDbContext _context;

    public DashboardService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<DashboardStatsDto> GetStatsAsync()
    {
        var totalItems = await _context.Items.CountAsync();

        var totalCategories = await _context.Categories.CountAsync();

        var lowStockItems = await _context.Items
            .CountAsync(item => item.Quantity <= item.LowStockThreshold);

        var activeTransactions = await _context.Transactions
            .CountAsync(transaction => !transaction.IsReturned);

        var returnedTransactions = await _context.Transactions
            .CountAsync(transaction => transaction.IsReturned);

        return new DashboardStatsDto
        {
            TotalItems = totalItems,
            TotalCategories = totalCategories,
            LowStockItems = lowStockItems,
            ActiveTransactions = activeTransactions,
            ReturnedTransactions = returnedTransactions
        };
    }

    public async Task<IEnumerable<LowStockItemDto>> GetLowStockItemsAsync()
    {
        return await _context.Items
            .Include(item => item.Category)
            .Where(item => item.Quantity <= item.LowStockThreshold)
            .OrderBy(item => item.Quantity)
            .Take(5)
            .Select(item => new LowStockItemDto
            {
                Id = item.Id,
                Name = item.Name,
                Quantity = item.Quantity,
                CategoryName = item.Category!.Name
            })
            .ToListAsync();
    }

    public async Task<IEnumerable<RecentTransactionDto>> GetRecentTransactionsAsync()
    {
        return await _context.Transactions
            .Include(transaction => transaction.Item)
            .OrderByDescending(transaction => transaction.IssuedAt)
            .Take(5)
            .Select(transaction => new RecentTransactionDto
            {
                Id = transaction.Id,
                ItemName = transaction.Item!.Name,
                BorrowerName = transaction.BorrowerName,
                Quantity = transaction.Quantity,
                IsReturned = transaction.IsReturned,
                IssuedAt = transaction.IssuedAt
            })
            .ToListAsync();
    }
}