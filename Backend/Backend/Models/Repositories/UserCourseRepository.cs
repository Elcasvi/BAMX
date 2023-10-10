﻿using Backend.Models.Data;
using Backend.Models.Entities;
using Backend.Models.Entities.JoinTables;
using Backend.Models.Interfaces;

namespace Backend.Models.Repositories;

public class UserCourseRepository :IUserCourseRepository
{
    private readonly AppDbContext _dbContext;
    private readonly IUserRepository _userRepository;
    private readonly ICourseRepository _courseRepository;

    public UserCourseRepository(AppDbContext dbContext, IUserRepository userRepository, ICourseRepository courseRepository)
    {
        _dbContext = dbContext;
        _userRepository = userRepository;
        _courseRepository = courseRepository;
    }

    public ICollection<Course> GetAllCoursesByUserId(int userId)
    {
        return _dbContext.UserCourses.Where(uc => uc.UserId == userId).Select(c => c.Course).ToList();
    }
    public ICollection<UserCourse> GetAllUserCoursesByUserId(int userId)
    {
        return _dbContext.UserCourses.Where(uc => uc.UserId == userId).Select(u => u).ToList();
    }

    public ICollection<UserCourse> GetAllUserCoursesByCourseId(int courseId)
    {
        return _dbContext.UserCourses.Where(uc => uc.CourseId == courseId).Select(u => u).ToList();
    }
    public User AddUserCourse(int courseId,int userId)
    {
        var course = _courseRepository.Get(courseId);
        var user =_userRepository.Get(userId);
        UserCourse userCourse = new UserCourse()
        {
            User = user,
            UserId = userId,
            Course = course,
            CourseId = courseId
        };
        _dbContext.UserCourses.Add(userCourse);
        var newUserCourse=_dbContext.Users.Add(user).Entity;
        Save();
        return newUserCourse;
    }
    public UserCourse DeleteUserCourse(UserCourse userCourse)
    {
        return _dbContext.UserCourses.Remove(userCourse).Entity;
    }
    public ICollection<User> GetAllUsersByCourseId(int courseId)
    {
        return _dbContext.UserCourses.Where(uc => uc.CourseId == courseId).Select(u => u.User).ToList();
    }
    private bool Save()
    {
        var saved = _dbContext.SaveChanges();
        return saved >0 ? true : false;
    }
}