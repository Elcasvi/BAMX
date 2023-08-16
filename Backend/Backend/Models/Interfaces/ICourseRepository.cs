using Backend.Models.Entities;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Backend.Models.Interfaces
{
    
    public interface ICourseRepository
    {
        public Course Get(int id);
        public Course Get(string email,string password);
        public ICollection<Course>GetCourses();
        public EntityEntry<Course> Add(Course Course);
        public EntityEntry<Course> Delete(Course Course);
        public EntityEntry<Course> Update(Course Course);
        public bool Exists(int id);
        public bool Save();
    }
}
