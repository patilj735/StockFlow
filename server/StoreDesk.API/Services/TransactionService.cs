using Microsoft.EntityFrameworkCore;
using StoreDesk.API.Data;
using StoreDesk.API.DTOs;
using StoreDesk.API.Interfaces;
using StoreDesk.API.Models;

namespace StoreDesk.API.Services;

public class TransactionService : ITransactionService
{
    private readonly AppDbContext _context;

    public TransactionService(
        AppDbContext context)
    {
        _context = context;
    }

    public async Task<TransactionResponseDto>IssueItemAsync(CreateTransactionDto dto)
    {
        await using var dbTx = await _context.Database.BeginTransactionAsync();

        var item = await _context.Items.FirstOrDefaultAsync(item => item.Id == dto.ItemId);

        if (item is null)
        {
            throw new Exception("Item not found");
        }

        if (item.Quantity < dto.Quantity)
        {
            throw new Exception("Not enough stock available");
        }

        item.Quantity -= dto.Quantity;

        var transaction = new Transaction
        {
            ItemId = dto.ItemId,
            BorrowerName = dto.BorrowerName,
            BorrowerEmail = dto.BorrowerEmail,
            Quantity = dto.Quantity,
            IssuedAt = DateTime.UtcNow,
            IsReturned = false
        };

        _context.Transactions.Add(transaction);

        await _context.SaveChangesAsync();

        await dbTx.CommitAsync();

        return new TransactionResponseDto
        {
            Id = transaction.Id,
            ItemId = item.Id,
            ItemName = item.Name,
            BorrowerName = transaction.BorrowerName,
            BorrowerEmail = transaction.BorrowerEmail,
            Quantity = transaction.Quantity,
            IssuedAt = transaction.IssuedAt,
            ReturnedAt = transaction.ReturnedAt,
            IsReturned = transaction.IsReturned
        };
    }

    public async Task<TransactionResponseDto?>ReturnItemAsync(int transactionId)
    {
        await using var dbTx = await _context.Database.BeginTransactionAsync();

        var transaction = await _context.Transactions
            .Include(transaction => transaction.Item)
            .FirstOrDefaultAsync(transaction => transaction.Id == transactionId);

        if (transaction is null)
        {
            return null;
        }

        if (transaction.IsReturned)
        {
            throw new Exception("Item already returned");
        }

        if (transaction.Item is null)
        {
            throw new Exception("Item not found");
        }

        transaction.IsReturned = true;

        transaction.ReturnedAt = DateTime.UtcNow;

        transaction.Item.Quantity += transaction.Quantity;

        await _context.SaveChangesAsync();

        await dbTx.CommitAsync();

        return new TransactionResponseDto
        {
            Id = transaction.Id,
            ItemId = transaction.ItemId,
            ItemName = transaction.Item.Name,
            BorrowerName = transaction.BorrowerName,
            BorrowerEmail = transaction.BorrowerEmail,
            Quantity = transaction.Quantity,
            IssuedAt = transaction.IssuedAt,
            ReturnedAt = transaction.ReturnedAt,
            IsReturned = transaction.IsReturned
        };
    }

    public async Task<IEnumerable<TransactionResponseDto>>GetAllAsync()
    {
        return await _context.Transactions
            .Include(transaction => transaction.Item)
            .Select(transaction =>
                new TransactionResponseDto
                {
                    Id = transaction.Id,
                    ItemId = transaction.ItemId,
                    ItemName = transaction.Item!.Name,
                    BorrowerName = transaction.BorrowerName,
                    BorrowerEmail = transaction.BorrowerEmail,
                    Quantity = transaction.Quantity,
                    IssuedAt = transaction.IssuedAt,
                    ReturnedAt = transaction.ReturnedAt,
                    IsReturned = transaction.IsReturned
                })
            .ToListAsync();
    }
}