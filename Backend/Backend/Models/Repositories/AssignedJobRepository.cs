using AutoMapper;
using Backend.Models.Data;
using Backend.Models.Entities;
using Backend.Models.Interfaces;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Backend.Models.Repositories
{
    public class AssignedJobRepository : IAssignedJobRepository
    {
        private readonly AppDbContext _dbContext;
        public AssignedJobRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public AssignedJob Get(int id)
        {
            return _dbContext.AssignedJobs.FirstOrDefault(assignedJob => assignedJob.Id == id);
        }

        public ICollection<AssignedJob> GetAll()
        {
            return _dbContext.AssignedJobs.ToList();
        }

        public User GetUserFromAssignedJob(int assignedJobId)
        {
            return _dbContext.AssignedJobs.Where(assignedJob => assignedJob.Id == assignedJobId).Select(aj => aj.User).FirstOrDefault();
        }

        public EntityEntry<AssignedJob> Add(AssignedJob assignedJob)
        {
            var newAssignedJob=_dbContext.AssignedJobs.Add(assignedJob);
            Save();
            return newAssignedJob;
        }

        public EntityEntry<AssignedJob> Delete(AssignedJob assignedJob)
        {
            var deletedAssignedJob=_dbContext.AssignedJobs.Remove(assignedJob);
            Save();
            return deletedAssignedJob;
        }

        public EntityEntry<AssignedJob> Update(AssignedJob assignedJob)
        {
            var updatedAssignedJob=_dbContext.AssignedJobs.Update(assignedJob);
            Save();
            return updatedAssignedJob;
        }

        public bool AssignedJobExists(int id)
        {
            return _dbContext.AssignedJobs.Any(assignedJob => assignedJob.Id == id);
        }

        public bool Save()
        {
            var saved = _dbContext.SaveChanges();
            return saved >0 ? true : false;
        }
    }
}
