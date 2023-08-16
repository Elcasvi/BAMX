using Backend.Models.Entities;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Backend.Models.Interfaces
{
    public interface IUserRepository
    {
        public User Get(int id);
        public User Get(string email,string password);
        public ICollection<User>GetAll();
        public EntityEntry<User> Add(User user);
        public EntityEntry<User> Delete(User user);
        public EntityEntry<User> Update(User user);
        public bool Exists(string email,string password);
        public bool Exists(int id);
        public bool Save();

    }
}
