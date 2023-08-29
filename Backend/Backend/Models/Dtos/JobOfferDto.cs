namespace Backend.Models.Dtos;

public class JobOfferDto
{
    public string Title { get; set; }
    public string Description { get; set; }
    public DateTime Created { get; set; }
    public string Enterprise { get; set; }
    public string? JobOfferPicture { get; set; }
}