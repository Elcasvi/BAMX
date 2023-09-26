using Backend.Models.Entities;
using Backend.Models.Entities.JoinTables;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Backend.Models.Interfaces
{
    public interface IUserRepository
    {
        public User Get(int id);
        public User Get(string email,string password);
        public ICollection<User>GetAll();
        public ICollection<JobOffer> GetAllJobOffersByUserId(int userId);
        public ICollection<Course> GetAllCoursesByUserId(int userId);
        public ICollection<AssignedJob> GetAllAssignedJobsByUserId(int userId);
        public EntityEntry<User> Add(User user);
        public EntityEntry<User> Delete(User user);
        public EntityEntry<User> Update(User user);
        public EntityEntry<UserJobOffer> AddUserJobOffer(int jobOfferId,int userId);
        public EntityEntry<User> AddUserCourse(int courseId, User user);
        public bool Exists(string email,string password);
        public bool Exists(int id);
        public User UpdateUser(User user);
        public bool Save();

    }
}
