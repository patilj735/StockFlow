using Microsoft.EntityFrameworkCore;
using StoreDesk.API.Models;

namespace StoreDesk.API.Data.Seeders;

public static class TransactionSeeder
{
    public static async Task SeedAsync(IServiceProvider serviceProvider)
    {
        var context = serviceProvider.GetRequiredService<AppDbContext>();

        if (await context.Transactions.AnyAsync())
        {
            return;
        }

        var keyboard = await context.Items
                .FirstAsync(item =>
                    item.Name == "Mechanical Keyboard");

        var router = await context.Items
                .FirstAsync(item =>
                    item.Name == "WiFi Router");

        var transactions = new List<Transaction>
            {
                new()
                {
                    BorrowerName = "Maruf",
                    ItemId = keyboard.Id,
                    Quantity = 1,
                    IssuedAt = DateTime.UtcNow.AddDays(-2),
                    IsReturned = false
                },

                new()
                {
                    BorrowerName = "QA Tester",
                    ItemId = router.Id,
                    Quantity = 1,
                    IssuedAt = DateTime.UtcNow.AddDays(-5),
                    ReturnedAt = DateTime.UtcNow.AddDays(-1),
                    IsReturned = true
                }
            };

        await context.Transactions.AddRangeAsync(transactions);

        await context.SaveChangesAsync();
    }
}