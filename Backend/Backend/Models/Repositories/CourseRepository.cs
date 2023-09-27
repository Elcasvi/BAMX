using Backend.Models.Data;
using Backend.Models.Entities;
using Backend.Models.Interfaces;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Backend.Models.Repositories
{
    
    
    public class CourseRepository : ICourseRepository
    {
        private readonly AppDbContext _dbContext;

        public CourseRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Course Get(int id)
        {
            return _dbContext.Courses.FirstOrDefault(course=>course.Id==id);
        }
        public ICollection<Course> GetAll()
        {
            return _dbContext.Courses.ToList();
        }
        

        public EntityEntry<Course> Add(Course course)
        {
            var addedCourse= _dbContext.Courses.Add(course);
            Save();
            return addedCourse;
        }

        public Course Delete(Course course)
        {
            var deletedCourse= _dbContext.Courses.Remove(course).Entity;
            Save();
            return deletedCourse;
        }

        public Course Update(Course course)
        {
            var updatedCourse= _dbContext.Courses.Update(course).Entity;
            Save();
            return updatedCourse;
        }

        public bool Exists(int id)
        {
            return _dbContext.Courses.Any(course => course.Id == id);
        }

        public Course UpdateCourse(Course course)
        {
            Course updatedCourse=_dbContext.Courses.Update(course).Entity;
            Save();
            return updatedCourse;
        }
        public bool Save()
        {
            var saved = _dbContext.SaveChanges();
            return saved >0 ? true : false;
        }
    }
}
