using Microsoft.AspNetCore.Identity;
using StoreDesk.API.Constants;
using StoreDesk.API.Models;

namespace StoreDesk.API.Data.Seeders;

public static class AdminSeeder
{
    public static async Task SeedAdminAsync(
        IServiceProvider serviceProvider,
        IConfiguration configuration)
    {
        var userManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();

        var adminEmail = configuration["AdminUser:Email"] ?? "admin@storedesk.com";
        var adminPassword = configuration["AdminUser:Password"] ?? "Admin@123";

        var existingAdmin = await userManager.FindByEmailAsync(adminEmail);

        if (existingAdmin is not null)
        {
            return;
        }

        var adminUser = new ApplicationUser
        {
            FullName = "System Administrator",
            Email = adminEmail,
            UserName = adminEmail,
            EmailConfirmed = true
        };

        var result = await userManager.CreateAsync(adminUser, adminPassword!);

        if (!result.Succeeded)
        {
            var errors = string.Join(", ", result.Errors.Select(error => error.Description));

            throw new Exception($"Failed to seed admin user: {errors}");
        }

        await userManager.AddToRoleAsync(adminUser, Roles.Admin);
    }
}