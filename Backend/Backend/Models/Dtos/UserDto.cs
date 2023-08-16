﻿namespace Backend.Models.Dtos;

public class UserDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string Role { get; set; }
    public string Gender { get; set; }
    public string ProfilePic { get; set; }
    public float Rating { get; set; }
}