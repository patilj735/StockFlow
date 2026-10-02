using System.Net;
using System.Text.Json;
using StoreDesk.API.Common;

namespace StoreDesk.API.Middleware;

public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;

    private readonly ILogger<ExceptionMiddleware> _logger;

    public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception exception)
        {
            _logger.LogError(exception, exception.Message);

            context.Response.ContentType = "application/json";

            var statusCode = HttpStatusCode.InternalServerError;
            var message = "An unexpected error occurred";

            if (exception is BadHttpRequestException badRequestException)
            {
                statusCode = (HttpStatusCode)badRequestException.StatusCode;
                message = badRequestException.Message;
            }
            else if (exception is KeyNotFoundException keyNotFoundException)
            {
                statusCode = HttpStatusCode.NotFound;
                message = keyNotFoundException.Message;
            }
            else if (exception.Message == "Email already exists" ||
                     exception.Message == "Not enough stock available" ||
                     exception.Message == "Item already returned" ||
                     exception.Message == "Item not found")
            {
                statusCode = HttpStatusCode.BadRequest;
                message = exception.Message;
            }

            context.Response.StatusCode = (int)statusCode;

            var response = ApiResponse<string>.FailureResponse(message);

            var json = JsonSerializer.Serialize(response);

            await context.Response.WriteAsync(json);
        }
    }
}