using Microsoft.AspNetCore.Identity;

namespace StoreDesk.API.Models;

public class ApplicationUser : IdentityUser
{
    public string FullName { get; set; } = string.Empty;
}