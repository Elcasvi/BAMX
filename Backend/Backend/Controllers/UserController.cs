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
    private readonly IJobOfferRepository _jobOfferRepository;
    private readonly IMapper _mapper;
    private readonly Hash _hash;

    public UserController(IUserRepository userRepository,IJobOfferRepository jobOfferRepository,IMapper mapper,Hash hash)
    {
        _userRepository = userRepository;
        _jobOfferRepository = jobOfferRepository;
        _mapper = mapper;
        _hash = hash;
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
        if (!_userRepository.Exists(userId))
        {
            return NotFound();
        }
        var jobOffers = _userRepository.GetAllJobOffersByUserId(userId);
        if(!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        return Ok(jobOffers);
    }
    
    [HttpGet("courses/{userId}")]
    public IActionResult GetAllCourses(int userId)
    {
        if (!_userRepository.Exists(userId))
        {
            return NotFound();
        }
        var courses = _userRepository.GetAllCoursesByUserId(userId);
        if(!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        return Ok(courses);
    }
    
    [HttpGet("assignedJobs/{userId}")]
    public IActionResult GetAllAssignedJobs(int userId)
    {
        if (!_userRepository.Exists(userId))
        {
            return NotFound();
        }
        var assignedJobs = _mapper.Map<List<AssignedJobDto>>(_userRepository.GetAllAssignedJobsByUserId(userId));
        if(!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        return Ok(assignedJobs);
    }
    
    [HttpPost]
    public IActionResult Add([FromBody]UserDto userDto)
    {
        if (userDto==null)
        {
            return BadRequest(ModelState);
        }

        if (_userRepository.Exists(userDto.Email,userDto.Password))
        {
            ModelState.AddModelError("","User already exists");
            return StatusCode(422, ModelState);
        }

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var userMap = _mapper.Map<User>(userDto);
        User newUser = _userRepository.Add(userMap).Entity;
        if (newUser == null)
        {
            ModelState.AddModelError("","Something went wrong while saving");
            return StatusCode(500, ModelState);
        }
        return Ok(newUser);
    }
    
    [HttpPost("update/{jobOfferId}")]
    public IActionResult UpdateUserJobOffer(int jobOfferId,[FromBody] UserDto userDto)
    {
        if (userDto==null)
        {
            return BadRequest(ModelState);
        }
        if (!_userRepository.Exists(userDto.Email,userDto.Password))
        {
            ModelState.AddModelError("","User does not exists");
            return StatusCode(422, ModelState);
        }
        if (!_jobOfferRepository.Exists(jobOfferId))
        {
            ModelState.AddModelError("","Job offer does not exists");
            return StatusCode(422, ModelState);
        }
        var userMap = _mapper.Map<User>(userDto);
        var updatedUser=_userRepository.AddUserJobOffer(jobOfferId, userMap).Entity;
        if (updatedUser == null)
        {
            ModelState.AddModelError("","Something went wrong while saving");
            return StatusCode(500, ModelState);
        }
        return Ok(updatedUser);
    }
    
    [HttpPost("{password}")]
    public IActionResult HashString(string password)
    {
        return Ok(_hash.HashPassword(password));
    }
    
    
}