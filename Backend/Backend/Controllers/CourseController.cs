using AutoMapper;
using Backend.Models.Dtos;
using Backend.Models.Entities;
using Backend.Models.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("[Controller]")]
public class CourseController:ControllerBase
{
    private readonly ICourseRepository _courseRepository;
    private readonly IMapper _mapper;

    public CourseController(ICourseRepository courseRepository, IMapper mapper)
    {
        _courseRepository = courseRepository;
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
        var courses = _mapper.Map<List<CourseDto>>(_courseRepository.GetAll());
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        return Ok(courses);
    }

    [HttpGet("users/{courseId}")]
    public IActionResult GetUsersForCourse(int courseId)
    {
        if (!_courseRepository.Exists(courseId))
        {
            return NotFound();
        }
        var courses = _mapper.Map<List<CourseDto>>(_courseRepository.GetAllUsersByCourseId(courseId));
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        return Ok(courses);
    }

    [HttpPost]
    public IActionResult CreateCourse([FromBody]CourseDto courseDto)
    {
        if (courseDto==null)
        {
            return BadRequest();
        }
        /*
        if (_jobOfferRepository.Exists())
        {
            ModelState.AddModelError("","User already exists");
            return StatusCode(422, ModelState);
        }
        */
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var courseMap= _mapper.Map<Course>(courseDto);
        Course newCourse = _courseRepository.Add(courseMap).Entity;
        if (newCourse == null)
        {
            ModelState.AddModelError("","Something went wrong while saving");
            return StatusCode(500, ModelState);
        }
        return Ok(newCourse);
    }
}