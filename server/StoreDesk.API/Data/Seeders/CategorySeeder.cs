using Microsoft.EntityFrameworkCore;
using StoreDesk.API.Models;

namespace StoreDesk.API.Data.Seeders;

public static class CategorySeeder
{
    public static async Task SeedAsync(IServiceProvider serviceProvider)
    {
        var context = serviceProvider.GetRequiredService<AppDbContext>();

        if (await context.Categories.AnyAsync())
        {
            return;
        }

        var categories = new List<Category>
        {
            new()
            {
                Name = "Books",
                Description = "Books and publications"
            },

            new()
            {
                Name = "Electronics",
                Description = "Electronic devices"
            },

            new()
            {
                Name = "Office Supplies",
                Description = "Office materials"
            },

            new()
            {
                Name = "Furniture",
                Description = "Office furniture"
            },

            new()
            {
                Name = "Gaming",
                Description = "Gaming accessories"
            },

            new()
            {
                Name = "Networking",
                Description = "Networking devices"
            },

            new()
            {
                Name = "Hardware",
                Description = "Computer hardware"
            },

            new()
            {
                Name = "Accessories",
                Description = "General accessories"
            },

            new()
            {
                Name = "Software",
                Description = "Software licenses"
            },

            new()
            {
                Name = "Stationery",
                Description = "Stationery items"
            }
        };

        await context.Categories.AddRangeAsync(categories);

        await context.SaveChangesAsync();
    }
}