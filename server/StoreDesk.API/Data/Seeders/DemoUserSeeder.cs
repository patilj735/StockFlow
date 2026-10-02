using Microsoft.AspNetCore.Identity;
using StoreDesk.API.Constants;
using StoreDesk.API.Models;

namespace StoreDesk.API.Data.Seeders;

public static class DemoUserSeeder
{
    public static async Task SeedAsync(IServiceProvider serviceProvider)
    {
        var userManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();

        var users = new List<(string FullName, string Email, string Password)>
            {
                (
                    "QA Tester",
                    "qa@storedesk.com",
                    "Qa123!"
                ),

                (
                    "Developer User",
                    "dev@storedesk.com",
                    "Dev123!"
                )
            };

        foreach (var userData in users)
        {
            var existingUser = await userManager.FindByEmailAsync(userData.Email);

            if (existingUser is not null)
            {
                continue;
            }

            var user = new ApplicationUser
                {
                    FullName = userData.FullName,
                    Email = userData.Email,
                    UserName = userData.Email,
                    EmailConfirmed = true
                };

            var result = await userManager.CreateAsync(user, userData.Password);

            if (!result.Succeeded)
            {
                var errors = string.Join(
                        ", ",
                        result.Errors.Select(error => error.Description));

                throw new Exception($"Failed to seed demo user: {errors}");
            }

            await userManager.AddToRoleAsync(user, Roles.User);
        }
    }
}