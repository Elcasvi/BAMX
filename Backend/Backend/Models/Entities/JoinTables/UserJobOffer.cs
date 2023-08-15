namespace Backend.Models.Entities.JoinTables;

public class UserJobOffer
{
    public int UserId { get; set; }
    public int JobOfferId { get; set; }
    public User User { get; set; }
    public JobOffer JobOffer { get; set; }
}