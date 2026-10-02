using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StoreDesk.API.Common;
using StoreDesk.API.Constants;
using StoreDesk.API.DTOs;
using StoreDesk.API.Interfaces;

namespace StoreDesk.API.Controllers;

[ApiController]
[Route("api/transactions")]
[Authorize]
public class TransactionsController : ControllerBase
{
    private readonly ITransactionService _transactionService;

    public TransactionsController(
        ITransactionService transactionService)
    {
        _transactionService = transactionService;
    }

    [HttpGet]
    public async Task<ActionResult> GetTransactions()
    {
        var transactions =
            await _transactionService.GetAllAsync();

        return Ok(
            ApiResponse<IEnumerable<TransactionResponseDto>>
                .SuccessResponse(
                    transactions,
                    "Transactions fetched successfully"
                ));
    }

    [Authorize(Roles = Roles.Admin)]
    [HttpPost("issue")]
    public async Task<ActionResult> IssueItem(
        CreateTransactionDto dto)
    {
        var transaction =
            await _transactionService.IssueItemAsync(dto);

        return Ok(
            ApiResponse<TransactionResponseDto>
                .SuccessResponse(
                    transaction,
                    "Item issued successfully"
                ));
    }

    [Authorize(Roles = Roles.Admin)]
    [HttpPatch("{id}/return")]
    public async Task<ActionResult> ReturnItem(
        int id)
    {
        var transaction =
            await _transactionService.ReturnItemAsync(id);

        if (transaction is null)
        {
            return NotFound(
                ApiResponse<string>
                    .FailureResponse(
                        "Transaction not found"
                    ));
        }

        return Ok(
            ApiResponse<TransactionResponseDto>
                .SuccessResponse(
                    transaction,
                    "Item returned successfully"
                ));
    }
}