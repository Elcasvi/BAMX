﻿using Backend.Models.Data;
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

        public ICollection<User> GetAllUsersByCourseId(int courseId)
        {
            return _dbContext.UserCourses.Where(uc => uc.CourseId == courseId).Select(u => u.User).ToList();
        }

        public EntityEntry<Course> Add(Course course)
        {
            var addedCourse= _dbContext.Courses.Add(course);
            Save();
            return addedCourse;
        }

        public EntityEntry<Course> Delete(Course course)
        {
            var deletedCourse= _dbContext.Courses.Remove(course);
            Save();
            return deletedCourse;
        }

        public EntityEntry<Course> Update(Course course)
        {
            var updatedCourse= _dbContext.Courses.Update(course);
            Save();
            return updatedCourse;
        }

        public bool Exists(int id)
        {
            return _dbContext.Courses.Any(course => course.Id == id);
        }

        public bool Save()
        {
            var saved = _dbContext.SaveChanges();
            return saved >0 ? true : false;
        }
    }
}
