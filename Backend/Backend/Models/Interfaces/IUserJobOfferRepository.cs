using Backend.Models.Entities;
using Backend.Models.Entities.JoinTables;

namespace Backend.Models.Interfaces;

public interface IUserJobOfferRepository
{
    public ICollection<JobOffer> GetAllJobOffersByUserId(int userId);
    public ICollection<UserJobOffer> GetAllUserJobOffersByUserId(int userId);
    public ICollection<UserJobOffer> GetAllUserJobOffersByJobOfferId(int jobOfferId);
    public UserJobOffer DeleteUserJobOffer(UserJobOffer userJobOffer);
    public ICollection<User> GetAllUsersByJobOfferId(int jobOfferId);
}