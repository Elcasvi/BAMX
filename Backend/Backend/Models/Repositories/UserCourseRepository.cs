using Backend.Models.Data;
using Backend.Models.Entities;
using Backend.Models.Entities.JoinTables;
using Backend.Models.Interfaces;

namespace Backend.Models.Repositories;

public class UserCourseRepository :IUserCourseRepository
{
    private readonly AppDbContext _dbContext;

    public UserCourseRepository(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    public ICollection<Course> GetAllCoursesByUserId(int userId)
    {
        return _dbContext.UserCourses.Where(uc => uc.UserId == userId).Select(c => c.Course).ToList();
    }
    public ICollection<UserCourse> GetAllUserCoursesByUserId(int userId)
    {
        return _dbContext.UserCourses.Where(uc => uc.UserId == userId).Select(u => u).ToList();
    }
    public UserCourse DeleteUserCourse(UserCourse userCourse)
    {
        return _dbContext.UserCourses.Remove(userCourse).Entity;
    }
    public ICollection<User> GetAllUsersByCourseId(int courseId)
    {
        return _dbContext.UserCourses.Where(uc => uc.CourseId == courseId).Select(u => u.User).ToList();
    }
}