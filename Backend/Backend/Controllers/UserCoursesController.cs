using Backend.Models.Interfaces;
using Microsoft.AspNetCore.Mvc;
namespace Backend.Controllers;
[ApiController]
[Route("[controller]")]
public class UserCoursesController:ControllerBase
{

    private readonly IUserCourseRepository _userCourseRepository;
    private readonly ICourseRepository _courseRepository;
    private readonly IUserRepository _userRepository;

    public UserCoursesController(IUserCourseRepository userCourseRepository, ICourseRepository courseRepository, IUserRepository userRepository)
    {
        _userCourseRepository = userCourseRepository;
        _courseRepository = courseRepository;
        _userRepository = userRepository;
    }
    
    [HttpGet("{courseId}")]
    public IActionResult GetAllUsers(int courseId)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        if (!_courseRepository.Exists(courseId))
        {
            return NotFound(courseId);
        }
        
        return Ok(_userCourseRepository.GetAllUsersByCourseId(courseId));
    }
    
    [HttpGet("{userId}")]
    public IActionResult GetAllCoursesByUserId(int userId)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        if (!_userRepository.Exists(userId))
        {
            return NotFound(userId);
        }
        
        return Ok(_userCourseRepository.GetAllCoursesByUserId(userId));
    }
}