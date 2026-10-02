namespace StoreDesk.API.DTOs;

public class SortDto
{
    public string SortBy { get; set; } = "name";
    public string SortOrder { get; set; } = "asc";
}