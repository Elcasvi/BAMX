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
    [HttpGet("/UserCourses/Courses/{userId}")]
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
    
    [HttpPost("update/{courseId}/{userId}")]
    public IActionResult UpdateUserJobOffer(int courseId,int userId)
    {
        
        if (!_userRepository.Exists(userId))
        {
            ModelState.AddModelError("","User does not exists");
            return StatusCode(422, ModelState);
        }
        if (!_courseRepository.Exists(courseId))
        {
            ModelState.AddModelError("","Course does not exists");
            return StatusCode(422, ModelState);
        }
        var updatedUser=_userCourseRepository.AddUserCourse(courseId, userId);
        if (updatedUser == null)
        {
            ModelState.AddModelError("","Something went wrong while saving");
            return StatusCode(500, ModelState);
        }
        return Ok(updatedUser);
    }
}