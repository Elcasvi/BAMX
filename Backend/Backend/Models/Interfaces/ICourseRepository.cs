using Backend.Models.Entities;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Backend.Models.Interfaces
{
    
    public interface ICourseRepository
    {
        public Course Get(int id);
        public ICollection<Course>GetAll();
        public ICollection<User>GetAllUsersByCourseId(int courseId);
        public EntityEntry<Course> Add(Course course);
        public EntityEntry<Course> Delete(Course course);
        public EntityEntry<Course> Update(Course course);
        public bool Exists(int id);
        public bool Save();
    }
}
