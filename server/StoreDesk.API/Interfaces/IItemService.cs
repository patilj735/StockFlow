using StoreDesk.API.DTOs;

namespace StoreDesk.API.Interfaces;

public interface IItemService
{
    Task<IEnumerable<ItemResponseDto>> GetAllAsync(
        string? search,
        int? categoryId,
        PaginationDto pagination,
        SortDto sort
    );

    Task<ItemResponseDto?> GetByIdAsync(int id);

    Task<ItemResponseDto> CreateAsync(CreateItemDto dto);

    Task<ItemResponseDto?> UpdateAsync(int id, UpdateItemDto dto);

    Task<bool> DeleteAsync(int id);

    Task<int> GetCountAsync(string? search, int? categoryId);
}