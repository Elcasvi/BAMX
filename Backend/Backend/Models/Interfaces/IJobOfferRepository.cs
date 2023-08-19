using Backend.Models.Entities;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Backend.Models.Interfaces
{
    public interface IJobOfferRepository
    {
        public JobOffer Get(int id);
        public ICollection<JobOffer>GetAll();
        public ICollection<User> GetAllUsersByJobOfferId(int jobOfferId);
        public EntityEntry<JobOffer> Add(JobOffer jobOffer);
        public EntityEntry<JobOffer> Delete(JobOffer jobOffer);
        public EntityEntry<JobOffer> Update(JobOffer jobOffer);
        public bool Exists(int id);
        public bool Save();
    }
}