using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StoreDesk.API.Common;
using StoreDesk.API.DTOs;
using StoreDesk.API.Interfaces;

namespace StoreDesk.API.Controllers;

[ApiController]
[Route("api/dashboard")]
[Authorize]
public class DashboardController : ControllerBase
{
    private readonly IDashboardService _dashboardService;

    public DashboardController(IDashboardService dashboardService)
    {
        _dashboardService = dashboardService;
    }

    [HttpGet]
    public async Task<ActionResult> GetDashboardStats()
    {
        var stats = await _dashboardService.GetStatsAsync();

        return Ok(ApiResponse<DashboardStatsDto>
                .SuccessResponse(
                    stats,
                    "Dashboard statistics fetched successfully"
                ));
    }

    [HttpGet("low-stock")]
    public async Task<ActionResult>GetLowStockItems()
    {
        var items = await _dashboardService.GetLowStockItemsAsync();

        return Ok(ApiResponse<IEnumerable<LowStockItemDto>>
                .SuccessResponse(
                    items,
                    "Low stock items fetched successfully"
                ));
    }

    [HttpGet("recent-transactions")]
    public async Task<ActionResult>GetRecentTransactions()
    {
        var transactions = await _dashboardService.GetRecentTransactionsAsync();

        return Ok(ApiResponse<IEnumerable<RecentTransactionDto>>
                .SuccessResponse(
                    transactions,
                    "Recent transactions fetched successfully"
                ));
    }
}