using Backend.Models.Data;
using Backend.Models.Entities;
using Backend.Models.Interfaces;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Backend.Models.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _dbContext;
        public UserRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        
        public User Get(int id)
        {
            return _dbContext.Users.Where(user => user.Id == id).FirstOrDefault();
        }
        public User Get(string email,string password)
        {
            return _dbContext.Users.Where(userE => userE.Email == email).Where(userP => userP.Password == password).FirstOrDefault();
        }
        public ICollection<User> GetAll()
        {
            return _dbContext.Users.ToList();
        }

        public ICollection<JobOffer> GetAllJobOffersByUserId(int userId)
        {
            return _dbContext.UserJobOffers.Where(uj => uj.UserId == userId).Select(j => j.JobOffer).ToList();
        }
        public ICollection<Course> GetAllCoursesByUserId(int userId)
        {
            return _dbContext.UserCourses.Where(uc => uc.UserId == userId).Select(c => c.Course).ToList();
        }
        public ICollection<AssignedJob> GetAllAssignedJobsByUserId(int userId)
        {
            return _dbContext.AssignedJobs.Where(assignedJob => assignedJob.User.Id == userId).ToList();
        }
        
        public EntityEntry<User> Add(User user)
        {
            var newUser=_dbContext.Users.Add(user);
            Save();
            return newUser;
        }

        public EntityEntry<User> Delete(User user)
        {
            var deletedUser=_dbContext.Users.Remove(user);
            Save();
            return deletedUser;
        }

        public EntityEntry<User> Update(User user)
        {
            var updatedUser=_dbContext.Users.Update(user);
            Save();
            return updatedUser;
        }

        public bool Exists(string email, string password)
        {
            var user=_dbContext.Users.Where(userE => userE.Email == email).Where(userP => userP.Password == password).FirstOrDefault();
            if(user!=null)
            {
                return true;
            }
            return false;
        }
        public bool Exists(int id)
        {
            return _dbContext.Users.Any(user => user.Id == id);
        }
        public bool Save()
        {
            var saved = _dbContext.SaveChanges();
            return saved >0 ? true : false;
        }
    }
}
