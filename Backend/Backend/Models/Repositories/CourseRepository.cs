using Backend.Models.Entities;
using Backend.Models.Interfaces;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Backend.Models.Repositories
{
    public class CourseRepository : ICourseRepository
    {
        public Course Get(int id)
        {
            throw new NotImplementedException();
        }

        public Course Get(string email, string password)
        {
            throw new NotImplementedException();
        }

        public ICollection<Course> GetCourses()
        {
            throw new NotImplementedException();
        }

        public EntityEntry<Course> Add(Course Course)
        {
            throw new NotImplementedException();
        }

        public EntityEntry<Course> Delete(Course Course)
        {
            throw new NotImplementedException();
        }

        public EntityEntry<Course> Update(Course Course)
        {
            throw new NotImplementedException();
        }

        public bool Exists(int id)
        {
            throw new NotImplementedException();
        }

        public bool Save()
        {
            throw new NotImplementedException();
        }
    }
}
