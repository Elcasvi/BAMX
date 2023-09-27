using Backend.Models.Entities;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Backend.Models.Interfaces
{
    public interface IAssignedJobRepository
    {
        public AssignedJob Get(int id);
        public ICollection<AssignedJob>GetAll();
        public User GetUserFromAssignedJob(int assignedJobId);
        public EntityEntry<AssignedJob> Add(AssignedJob assignedJob);
        public AssignedJob Delete(AssignedJob assignedJob);
        public AssignedJob Update(AssignedJob assignedJob);
        public bool Exists(int id);
        public bool Save();
    }
}
