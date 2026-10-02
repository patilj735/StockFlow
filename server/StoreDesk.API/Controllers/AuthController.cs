using Microsoft.AspNetCore.Mvc;
using StoreDesk.API.Common;
using StoreDesk.API.DTOs;
using StoreDesk.API.Interfaces;

namespace StoreDesk.API.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<ActionResult> Register(RegisterDto dto)
    {
        var response = await _authService.RegisterAsync(dto);

        return Ok(ApiResponse<AuthResponseDto>
                .SuccessResponse(
                    response,
                    "User registered successfully"
                ));
    }

    [HttpPost("login")]
    public async Task<ActionResult> Login(LoginDto dto)
    {
        var response = await _authService.LoginAsync(dto);

        if (response is null)
        {
            return Unauthorized( ApiResponse<string>.FailureResponse("Invalid email or password"));
        }

        return Ok( ApiResponse<AuthResponseDto>
                .SuccessResponse(
                    response,
                    "Login successful"
                ));
    }
}