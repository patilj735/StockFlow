using System.ComponentModel.DataAnnotations;

namespace StoreDesk.API.DTOs;

public class CreateTransactionDto
{
    [Required]
    public int ItemId { get; set; }

    [Required]
    [MaxLength(100)]
    public string BorrowerName { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    [MaxLength(100)]
    public string BorrowerEmail { get; set; } = string.Empty;

    [Range(1, int.MaxValue)]
    public int Quantity { get; set; }
}

public class TransactionResponseDto
{
    public int Id { get; set; }
    public int ItemId { get; set; }
    public string ItemName { get; set; } = string.Empty;
    public string BorrowerName { get; set; } = string.Empty;
    public string BorrowerEmail { get; set; } = string.Empty;
    public int Quantity { get; set; }
    public DateTime IssuedAt { get; set; }
    public DateTime? ReturnedAt { get; set; }
    public bool IsReturned { get; set; }
}