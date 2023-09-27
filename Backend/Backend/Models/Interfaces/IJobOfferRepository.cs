using Backend.Models.Entities;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Backend.Models.Interfaces
{
    public interface IJobOfferRepository
    {
        public JobOffer Get(int id);
        public ICollection<JobOffer>GetAll();
        public EntityEntry<JobOffer> Add(JobOffer jobOffer);
        public JobOffer Delete(JobOffer jobOffer);
        public JobOffer Update(JobOffer jobOffer);
        public bool Exists(int id);
        public bool Save();
    }
}