namespace Backend.Models.Dtos;

public class UserDto
{
    public string Name { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string Role { get; set; }
    public string Gender { get; set; }
    public float Rating { get; set; }
    public string? Description { get; set; }
    public string? CVUrl { get; set; }
    public string? NameOfCV { get; set; }
    public string? ProfilePictureUrl { get; set; }
    public string? NameOfProfilePicture { get; set; }
}