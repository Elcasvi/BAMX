using Backend.Models.Entities;
using Backend.Models.Entities.JoinTables;

namespace Backend.Models.Interfaces;

public interface IUserCourseRepository
{
    public ICollection<Course> GetAllCoursesByUserId(int userId);
    public ICollection<UserCourse> GetAllUserCoursesByUserId(int userId);
    public ICollection<UserCourse> GetAllUserCoursesByCourseId(int courseId);
    public UserCourse DeleteUserCourse(UserCourse userCourse);
    public ICollection<User>GetAllUsersByCourseId(int courseId);

}