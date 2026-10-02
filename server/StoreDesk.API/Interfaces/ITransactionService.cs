using StoreDesk.API.DTOs;

namespace StoreDesk.API.Interfaces;

public interface ITransactionService
{
    Task<TransactionResponseDto> IssueItemAsync(CreateTransactionDto dto);

    Task<TransactionResponseDto?> ReturnItemAsync( int transactionId);

    Task<IEnumerable<TransactionResponseDto>> GetAllAsync();
}