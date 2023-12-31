﻿using AutoMapper;
using Backend.Models.Data;
using Backend.Models.Entities;
using Backend.Models.Entities.JoinTables;
using Backend.Models.Interfaces;
using Backend.Services;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Backend.Models.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _dbContext;
        private readonly Hash _hash;
        public UserRepository(AppDbContext dbContext,Hash hash)
        {
            _dbContext = dbContext;
            _hash = hash;
        }
        
        public User Get(int id)
        {
            return _dbContext.Users.Where(user => user.Id == id).FirstOrDefault();
        }
        public User Get(string email, string password)
        {
            var user = _dbContext.Users.FirstOrDefault(userE => userE.Email == email);
            if (user != null && _hash.Verify(password, user.Password))
            {
                return user;
            }
            return null;
        }
        public ICollection<User> GetAll()
        {
            return _dbContext.Users.ToList();
        }
        
        public ICollection<AssignedJob> GetAllAssignedJobsByUserId(int userId)
        {
            return _dbContext.AssignedJobs.Where(assignedJob => assignedJob.User.Id == userId).ToList();
        }
       
        
        public EntityEntry<User> Add(User user)
        {
            string hashedPassword= _hash.HashPassword(user.Password);
            user.Password = hashedPassword;
            var newUser=_dbContext.Users.Add(user);
            Save();
            return newUser;
        }

        public User Delete(User user)
        {
            var deletedUser=_dbContext.Users.Remove(user).Entity;
            Save();
            return deletedUser;
        }

        public User Update(User user)
        {
            var updatedUser=_dbContext.Users.Update(user).Entity;
            Save();
            return updatedUser;
        }
        public EntityEntry<User> AddUserCourse(int courseId,User user)
        {
            var course = _dbContext.Courses.FirstOrDefault(c => c.Id == courseId);
            var userId = Get(user.Email, user.Password).Id;
            UserCourse userCourse = new UserCourse()
            {
                User = user,
                UserId = userId,
                Course = course,
                CourseId = courseId
            };
            _dbContext.UserCourses.Add(userCourse);
            var newUserCourse=_dbContext.Users.Add(user);
            Save();
            return newUserCourse;
        }

        public bool Exists(string email, string password)
        {
            //var user=_dbContext.Users.Where(userE => userE.Email == email).Where(userP=>userP.Password==password).FirstOrDefault();
            var user=_dbContext.Users.Where(userE => userE.Email == email).FirstOrDefault();
            if (user != null && _hash.Verify(password, user.Password))
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
