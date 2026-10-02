using Microsoft.EntityFrameworkCore;
using StoreDesk.API.Models;

namespace StoreDesk.API.Data.Seeders;

public static class ItemSeeder
{
    public static async Task SeedAsync(IServiceProvider serviceProvider)
    {
        var context = serviceProvider.GetRequiredService<AppDbContext>();

        if (await context.Items.AnyAsync())
        {
            return;
        }

        var booksCategory = await context.Categories
                .FirstAsync(category =>
                    category.Name == "Books");

        var electronicsCategory = await context.Categories
                .FirstAsync(category =>
                    category.Name == "Electronics");

        var networkingCategory = await context.Categories
                .FirstAsync(category =>
                    category.Name == "Networking");

        var furnitureCategory = await context.Categories
                .FirstAsync(category =>
                    category.Name == "Furniture");

        var items = new List<Item>
        {
            new()
            {
                Name = "The Great Gatsby",
                Description = "Classic novel",
                Price = 20,
                Quantity = 4,
                CategoryId = booksCategory.Id
            },

            new()
            {
                Name = "Mechanical Keyboard",
                Description = "RGB gaming keyboard",
                Price = 120,
                Quantity = 15,
                CategoryId = electronicsCategory.Id
            },

            new()
            {
                Name = "Wireless Mouse",
                Description = "Ergonomic wireless mouse",
                Price = 45,
                Quantity = 20,
                CategoryId = electronicsCategory.Id
            },

            new()
            {
                Name = "Office Chair",
                Description = "Comfortable office chair",
                Price = 250,
                Quantity = 1,
                CategoryId = furnitureCategory.Id
            },

            new()
            {
                Name = "WiFi Router",
                Description = "Dual band router",
                Price = 90,
                Quantity = 2,
                CategoryId = networkingCategory.Id
            },

            new()
            {
                Name = "Monitor",
                Description = "27 inch display",
                Price = 300,
                Quantity = 0,
                CategoryId = electronicsCategory.Id
            }
        };

        await context.Items.AddRangeAsync(items);

        await context.SaveChangesAsync();
    }
}