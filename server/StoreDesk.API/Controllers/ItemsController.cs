using Microsoft.AspNetCore.Mvc;
using StoreDesk.API.DTOs;
using StoreDesk.API.Interfaces;
using StoreDesk.API.Common;
using Microsoft.AspNetCore.Authorization;
using StoreDesk.API.Constants;

namespace StoreDesk.API.Controllers;

[Authorize]
[ApiController]
[Route("api/items")]
public class ItemsController : ControllerBase
{
    private readonly IItemService _itemService;

    public ItemsController(IItemService itemService)
    {
        _itemService = itemService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ItemResponseDto>>> GetItems(
        [FromQuery] string? search,
        [FromQuery] int? categoryId,
        [FromQuery] PaginationDto pagination,
        [FromQuery] SortDto sort)
    {
        var totalCount = await _itemService.GetCountAsync(search, categoryId);

        var items = await _itemService.GetAllAsync(search, categoryId, pagination, sort);

        Response.Headers.Append("X-Total-Count", totalCount.ToString());

        return Ok( ApiResponse<IEnumerable<ItemResponseDto>>
                .SuccessResponse(
                    items,
                    "Items fetched successfully"
                ));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ItemResponseDto>> GetItemById(int id)
    {
        var item = await _itemService.GetByIdAsync(id);

        if (item is null)
        {
            return NotFound(ApiResponse<string>
                    .FailureResponse(
                        "Item not found"
                    ));
        }

        return Ok(ApiResponse<ItemResponseDto>
                .SuccessResponse(
                    item,
                    "Item fetched successfully"
                ));
    }

    [Authorize(Roles = Roles.Admin)]
    [HttpPost]
    public async Task<ActionResult<ItemResponseDto>> CreateItem(CreateItemDto dto)
    {
        var item = await _itemService.CreateAsync(dto);

        return CreatedAtAction(
            nameof(GetItemById),
            new { id = item.Id },
            ApiResponse<ItemResponseDto>
                .SuccessResponse(
                    item,
                    "Item created successfully"
                ));
    }

    [Authorize(Roles = Roles.Admin)]
    [HttpPut("{id}")]
    public async Task<ActionResult<ItemResponseDto>> UpdateItem(int id, UpdateItemDto dto)
    {
        var item = await _itemService.UpdateAsync(id, dto);

        if (item is null)
        {
            return NotFound();
        }

        return Ok(ApiResponse<ItemResponseDto>
                .SuccessResponse(
                    item,
                    "Item updated successfully"
                ));
    }

    [Authorize(Roles = Roles.Admin)]
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteItem(int id)
    {
        var deleted = await _itemService.DeleteAsync(id);

        if (!deleted)
        {
            return NotFound();
        }

        return Ok(ApiResponse<string>
                .SuccessResponse(
                    string.Empty,
                    "Item deleted successfully"
                ));
    }
}