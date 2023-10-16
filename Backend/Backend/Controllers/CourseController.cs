using AutoMapper;
using Backend.Models.Dtos;
using Backend.Models.Entities;
using Backend.Models.Entities.JoinTables;
using Backend.Models.Interfaces;
using Backend.Models.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace Backend.Controllers;

[ApiController]
[Route("[Controller]")]
public class CourseController : ControllerBase
{
    private readonly ICourseRepository _courseRepository;
    private readonly IUserCourseRepository _userCourseRepository;
    private readonly IMapper _mapper;

    public CourseController(ICourseRepository courseRepository, IUserCourseRepository userCourseRepository, IMapper mapper)
    {
        _courseRepository = courseRepository;
        _userCourseRepository = userCourseRepository;
        _mapper = mapper;
    }

    [HttpGet("{id}")]
    public IActionResult GetCourse(int id)
    {
        if (!_courseRepository.Exists(id))
        {
            return NotFound();
        }

        var course = _mapper.Map<CourseDto>(_courseRepository.Get(id));
        return Ok(course);
    }

    [HttpGet]
    public IActionResult GetCourses()
    {
        //var courses = _mapper.Map<List<CourseDto>>(_courseRepository.GetAll());
        var courses = _courseRepository.GetAll();
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        return Ok(courses);
    }

    [HttpGet("users/{courseId}")]
    public IActionResult GetUsersForCourse(int courseId)
    {
        ICollection<User> users = _userCourseRepository.GetAllUsersByCourseId(courseId);
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        return Ok(users);
    }

    [HttpPost]
    public IActionResult CreateCourse([FromBody] CourseDto courseDto)
    {
        if (courseDto == null)
        {
            return BadRequest();
        }

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var courseMap = _mapper.Map<Course>(courseDto);
        Course newCourse = _courseRepository.Add(courseMap).Entity;
        if (newCourse == null)
        {
            ModelState.AddModelError("", "Something went wrong while saving");
            return StatusCode(500, ModelState);
        }

        return Ok(newCourse);
    }
    
    [HttpPut("/update/courseId/{courseId}")]
    [ProducesResponseType(400)]
    [ProducesResponseType(404)]
    [ProducesResponseType(200)]
    public IActionResult UpdateUser(int courseId,[FromBody]Course updatedCourse)
    {
        if (updatedCourse == null)
        {
            return BadRequest(ModelState);
        }

        if (courseId != updatedCourse.Id)
        {
            return BadRequest(ModelState);
        }

        if (!_courseRepository.Exists(courseId))
        {
            return NotFound();
        }

        if (!ModelState.IsValid)
        {
            return BadRequest();
        }

        Course returnedUpdatedCourse = _courseRepository.UpdateCourse(updatedCourse);
        if (returnedUpdatedCourse==null)
        {
            ModelState.AddModelError("","Something went wrong updating the course");
            return StatusCode(500, ModelState);
        }
        return Ok(returnedUpdatedCourse);
    }
    [HttpDelete("delete/{courseId}")]
    public IActionResult DeleteJCourse(int courseId)
    {
        if (!_courseRepository.Exists(courseId))
        {
            return NotFound();
        }
        Course courseToDelete = _courseRepository.Get(courseId);
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        //Deleting the course from UserCourses table
        if (!_userCourseRepository.GetAllUserCoursesByCourseId(courseId).IsNullOrEmpty())
        {
            var userCourses=_userCourseRepository.GetAllUserCoursesByCourseId(courseId);
            if (userCourses.IsNullOrEmpty())
            {
                return NotFound();
            }
            foreach (UserCourse userCourse in userCourses)
            {
                var deletedUserCourse = _userCourseRepository.DeleteUserCourse(userCourse);
                if (deletedUserCourse == null)
                {
                    ModelState.AddModelError("","Something went wrong deleting the Courses in the UserCourses table");
                }
            }
        }
        Course deletedCourse = _courseRepository.Delete(courseToDelete);
        if (deletedCourse == null)
        {
            ModelState.AddModelError("","Something went wrong deleting the Course");
        }
        return Ok(deletedCourse);
    }
}