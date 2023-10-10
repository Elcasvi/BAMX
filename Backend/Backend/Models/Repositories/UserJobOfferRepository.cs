using Backend.Models.Data;
using Backend.Models.Entities;
using Backend.Models.Entities.JoinTables;
using Backend.Models.Interfaces;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Backend.Models.Repositories;

public class UserJobOfferRepository:IUserJobOfferRepository
{
    private readonly AppDbContext _dbContext;
    private readonly IUserRepository _userRepository;
    private readonly IJobOfferRepository _jobOfferRepository;

    public UserJobOfferRepository(AppDbContext dbContext, IUserRepository userRepository, IJobOfferRepository jobOfferRepository)
    {
        _dbContext = dbContext;
        _userRepository = userRepository;
        _jobOfferRepository = jobOfferRepository;
    }

    public ICollection<JobOffer> GetAllJobOffersByUserId(int userId)
    {
        return _dbContext.UserJobOffers.Where(uj => uj.UserId == userId).Select(j => j.JobOffer).ToList();
    }
    public ICollection<User> GetAllUsersByJobOfferId(int jobOfferId)
    {
        return _dbContext.UserJobOffers.Where(uj => uj.JobOfferId == jobOfferId).Select(u => u.User).ToList();
    }
    public ICollection<UserJobOffer> GetAllUserJobOffersByUserId(int userId)
    {
        return _dbContext.UserJobOffers.Where(uj => uj.UserId == userId).Select(userJobOffer => userJobOffer).ToList();
    }
    public ICollection<UserJobOffer> GetAllUserJobOffersByJobOfferId(int jobOfferId)
    {
        return _dbContext.UserJobOffers.Where(uj => uj.JobOfferId == jobOfferId).Select(userJobOffer => userJobOffer).ToList();
    }
    public UserJobOffer AddUserJobOffer(int jobOfferId,int userId)
    {
        var jobOffer =_jobOfferRepository.Get(jobOfferId);
        var user =_userRepository.Get(userId);
        UserJobOffer userJobOffer = new UserJobOffer()
        {
            UserId = userId,
            User = user,
            JobOfferId = jobOfferId,
            JobOffer = jobOffer,
                
        };
        var newUserJobOffer=_dbContext.Add(userJobOffer).Entity;
        Save();
        return newUserJobOffer;
    }
    public UserJobOffer DeleteUserJobOffer(UserJobOffer userJobOffer)
    {
        return _dbContext.UserJobOffers.Remove(userJobOffer).Entity;
    }
    private bool Save()
    {
        var saved = _dbContext.SaveChanges();
        return saved >0 ? true : false;
    }
}