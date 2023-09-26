using Backend.Models.Data;
using Backend.Models.Interfaces;
using Backend.Models.Entities;
using Microsoft.EntityFrameworkCore.ChangeTracking;


namespace Backend.Models.Repositories
{
    public class JobOfferRepository : IJobOfferRepository
    {
        private readonly AppDbContext _dbContext;

        public JobOfferRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public JobOffer Get(int id)
        {
            
            return _dbContext.JobOffers.FirstOrDefault(jobOffer => jobOffer.Id == id);
        }

        public ICollection<JobOffer> GetAll()
        {
            return _dbContext.JobOffers.ToList();
        }

        public ICollection<User> GetAllUsersByJobOfferId(int jobOfferId)
        {
            return _dbContext.UserJobOffers.Where(uj => uj.JobOfferId == jobOfferId).Select(u => u.User).ToList();
        }
        public EntityEntry<JobOffer> Add(JobOffer jobOffer)
        {
            var newJobOffer=_dbContext.JobOffers.Add(jobOffer);
            Save();
            return newJobOffer;
        }

        public EntityEntry<JobOffer> Delete(JobOffer jobOffer)
        {
            var deletedJobOffer=_dbContext.JobOffers.Remove(jobOffer);
            Save();
            return deletedJobOffer;
        }

        public EntityEntry<JobOffer> Update(JobOffer jobOffer)
        {
            var updatedJobOffer=_dbContext.JobOffers.Update(jobOffer);
            Save();
            return updatedJobOffer;
        }
        public bool Exists(int id)
        {
            return _dbContext.JobOffers.Any(J => J.Id == id);
        }

        public JobOffer UpdateJobOffer(JobOffer jobOffer)
        {
             JobOffer updatedJobOffer=_dbContext.JobOffers.Update(jobOffer).Entity;
             Save();
             return updatedJobOffer;
        }
        public bool Save()
        {
            var saved = _dbContext.SaveChanges();
            return saved >0 ? true : false;
        }
    }
}
