using AutoMapper;
using Backend.Models.Dtos;
using Backend.Models.Entities;
using Backend.Models.Interfaces;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("[Controller]")]
public class UserController:ControllerBase
{
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;
    private Hash _hash=new Hash();

    public UserController(IUserRepository userRepository,IMapper mapper)
    {
        _userRepository = userRepository;
        _mapper = mapper;
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        if (!_userRepository.Exists(id))
        {
            return NotFound();
        }
        var user = _mapper.Map<UserDto>(_userRepository.Get(id));
        return Ok(user);
    }
    
    [HttpGet("{email}/{password}")]
    public IActionResult GetByEmailAndPassword(string email, string password)
    {
        if (!_userRepository.Exists(email,password))
        {
            return NotFound();
        }
        var user = _mapper.Map<UserDto>(_userRepository.Get(email,password));
        return Ok(user);
    }

    [HttpGet]
    public IActionResult GetAllUsers()
    {
        var users=_mapper.Map<List<UserDto>>(_userRepository.GetAll());//This convert the users form the database into userDto objects
        if(!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        return Ok(users);
    }

    [HttpGet("jobOffers/{userId}")]
    public IActionResult GetAllJobOffers(int userId)
    {
        var jobOffers = _mapper.Map<List<JobOfferDto>>(_userRepository.GetAllJobOffersByUserId(userId));
        if(!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        return Ok(jobOffers);
    }
    
    [HttpGet("courses/{userId}")]
    public IActionResult GetAllCourses(int userId)
    {
        var courses = _mapper.Map<List<CourseDto>>(_userRepository.GetAllCoursesByUserId(userId));
        if(!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        return Ok(courses);
    }
    
    [HttpGet("assignedJobs/{userId}")]
    public IActionResult GetAllAssignedJobs(int userId)
    {
        var assignedJobs = _mapper.Map<List<AssignedJobDto>>(_userRepository.GetAllAssignedJobsByUserId(userId));
        if(!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        return Ok(assignedJobs);
    }
    
    [HttpPost]
    public IActionResult Add([FromBody]User user)
    {
        if (!_userRepository.Exists(user.Email,user.Password))
        {
            return BadRequest();
        }
        var newUser = _mapper.Map<List<UserDto>>(_userRepository.Add(user));
        return Ok(newUser);
    }

    [HttpPost("{password}")]
    public IActionResult hash(string password)
    {
        return Ok(_hash.HashPassword(password));
    }
    
}