using System.ComponentModel.DataAnnotations;

namespace StoreDesk.API.DTOs;

public class PaginationDto
{
    private const int MaxPageSize = 50;

    [Range(1, int.MaxValue, ErrorMessage = "Page must be greater than or equal to 1.")]
    public int Page { get; set; } = 1;

    private int _pageSize = 10;

    [Range(0, MaxPageSize, ErrorMessage = "PageSize must be between 0 and 50.")]
    public int PageSize
    {
        get => _pageSize;
        set => _pageSize =
            value > MaxPageSize
                ? MaxPageSize
                : value;
    }
}