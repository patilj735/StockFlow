using Microsoft.AspNetCore.Mvc;
using StoreDesk.API.Common;
using StoreDesk.API.DTOs;
using StoreDesk.API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using StoreDesk.API.Constants;

namespace StoreDesk.API.Controllers;

[Authorize]
[ApiController]
[Route("api/categories")]
public class CategoriesController : ControllerBase
{
    private readonly ICategoryService _categoryService;

    public CategoriesController(ICategoryService categoryService)
    {
        _categoryService = categoryService;
    }

    [HttpGet]
    public async Task<ActionResult> GetCategories()
    {
        var categories = await _categoryService.GetAllAsync();

        return Ok(ApiResponse<IEnumerable<CategoryResponseDto>>
            .SuccessResponse(
                categories,
                "Categories fetched successfully"
            ));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult> GetCategoryById(int id)
    {
        var category = await _categoryService.GetByIdAsync(id);

        if (category is null)
        {
            return NotFound(ApiResponse<string>
                    .FailureResponse(
                        "Category not found"
                    ));
        }

        return Ok(ApiResponse<CategoryResponseDto>
                .SuccessResponse(
                    category,
                    "Category fetched successfully"
                ));
    }

    [Authorize(Roles = Roles.Admin)]
    [HttpPost]
    public async Task<ActionResult> CreateCategory(CreateCategoryDto dto)
    {
        var category = await _categoryService.CreateAsync(dto);

        return CreatedAtAction(nameof(GetCategoryById),

            new { id = category.Id },

            ApiResponse<CategoryResponseDto>
                .SuccessResponse(
                    category,
                    "Category created successfully"
                ));
    }

    [Authorize(Roles = Roles.Admin)]
    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateCategory(int id, UpdateCategoryDto dto)
    {
        var category = await _categoryService.UpdateAsync(id, dto);

        if (category is null)
        {
            return NotFound(ApiResponse<string>.FailureResponse("Category not found"));
        }

        return Ok(ApiResponse<CategoryResponseDto>
                .SuccessResponse(
                    category,
                    "Category updated successfully"
                ));
    }

    [Authorize(Roles = Roles.Admin)]
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteCategory(int id)
    {
        var deleted = await _categoryService.DeleteAsync(id);

        if (!deleted)
        {
            return NotFound(ApiResponse<string>
                    .FailureResponse(
                        "Category not found"
                    ));
        }

        return Ok(ApiResponse<string>
                .SuccessResponse(
                    string.Empty,
                    "Category deleted successfully"
                ));
    }
}