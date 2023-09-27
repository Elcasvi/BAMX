using Backend.Models.Data;
using Backend.Models.Entities;
using Backend.Models.Entities.JoinTables;
using Backend.Models.Interfaces;

namespace Backend.Models.Repositories;

public class UserJobOfferRepository:IUserJobOfferRepository
{
    private readonly AppDbContext _dbContext;

    public UserJobOfferRepository(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public ICollection<JobOffer> GetAllJobOffersByUserId(int userId)
    {
        return _dbContext.UserJobOffers.Where(uj => uj.UserId == userId).Select(j => j.JobOffer).ToList();
    }
    public ICollection<UserJobOffer> GetAllUserJobOffersByUserId(int userId)
    {
        return _dbContext.UserJobOffers.Where(uj => uj.UserId == userId).Select(userJobOffer => userJobOffer).ToList();
    }
    public UserJobOffer DeleteUserJobOffer(UserJobOffer userJobOffer)
    {
        return _dbContext.UserJobOffers.Remove(userJobOffer).Entity;
    }

    public ICollection<User> GetAllUsersByJobOfferId(int jobOfferId)
    {
        return _dbContext.UserJobOffers.Where(uj => uj.JobOfferId == jobOfferId).Select(u => u.User).ToList();
    }
}